/** @jsxImportSource @emotion/react */

import React, {
    CSSProperties,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react"
import { motion } from "framer-motion"
import Airtable from "airtable"
import dotenv from "dotenv"
import { Slab, TextPanel } from "../containers"
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService"
import { useMyTheme } from "../hooks"
import { letterSpacings } from "../theme"
import { run$ } from "@-0/spool"
import { _NAVIGATE } from "../context"
import { API } from "@-0/browser"

dotenv.config()

const apiKey = process.env.REACT_APP_AIRTABLE
const places = process.env.REACT_APP_PLACES

//console.log({ apiKey })
const base = new Airtable({
    apiKey,
}).base("appK6q2gwVCCc0gmF")

/*
{
  "description": "Somerset, PA, USA",
  "matched_substrings": [
    {
      "length": 4,
      "offset": 0
    }
  ],
  "place_id": "ChIJk2aiIYTTyokRVBsWHkYkhFg",
  "reference": "ChIJk2aiIYTTyokRVBsWHkYkhFg",
  "structured_formatting": {
    "main_text": "Somerset",
    "main_text_matched_substrings": [
      {
        "length": 4,
        "offset": 0
      }
    ],
    "secondary_text": "PA, USA"
  },
  "terms": [
    {
      "offset": 0,
      "value": "Somerset"
    },
    {
      "offset": 10,
      "value": "PA"
    },
    {
      "offset": 14,
      "value": "USA"
    }
  ],
  "types": [
    "locality",
    "political",
    "geocode"
  ]
}
*/

export const Input = ({ label, placeholder, onChange, value, bg = "light_5", children = null }) => {
    const [focused, setFocused] = useState(false)
    const { colors } = useMyTheme()
    return (
        <label
            css={{
                position: "relative",
                display: "block",
                width: "100%",
                marginBottom: "4rem",
            }}
        >
            <input
                css={{
                    fontSize: "2rem",
                    width: "100%",
                    padding: "1rem 0",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    borderRadius: "0",
                    borderBottom: "1px solid black",
                    "::placeholder": {
                        color: "transparent",
                    },
                    "&:focus": {
                        outline: "none",
                    },
                }}
                placeholder={placeholder}
                onChange={ev => {
                    ev.preventDefault()
                    console.log({ value: ev.target.value })
                    onChange(ev)
                }}
                onFocus={ev => {
                    setFocused(true)
                }}
                onBlur={ev => {
                    ev.preventDefault()
                    setTimeout(() => {
                        setFocused(false)
                    }, 100)
                }}
                //  loading={isPlacePredictionsLoading}
                value={value}
            />
            <motion.span
                css={{
                    fontSize: "2rem",
                    position: "absolute",
                    top: 0,
                    padding: "1rem 0",
                    //left: 0,
                }}
                variants={{
                    focused: {
                        scale: 0.5,
                        y: -30,
                        x: "-25%",
                    },
                    unfocused: {
                        x: 0,
                        y: 0,
                    },
                }}
                transition={{
                    ease: [0.44, 0, 0.56, 1],
                }}
                animate={((focused || value) && "focused") || "unfocused"}
            >
                {label}
            </motion.span>
            <motion.div
                css={{
                    height: "2px",
                    backgroundColor: "black",
                    width: "100%",
                    position: "absolute",
                    top: 43,
                }}
                variants={{
                    focused: {
                        scaleX: 1,
                        x: 0,
                    },
                    unfocused: {
                        scaleX: 0,
                        x: "-50%",
                    },
                }}
                transition={{
                    ease: [0.44, 0, 0.56, 1],
                }}
                initial="unfocused"
                animate={(focused && "focused") || "unfocused"}
            />
            {focused && children}
        </label>
    )
}
const Li = ({ place_id, onClick, description }) => {
    return (
        <li
            key={place_id}
            css={{
                width: "100%",
                height: "auto",
                cursor: "pointer",
                fontSize: "1.6rem",
                padding: "1rem",
                "&:hover": {
                    textDecoration: "underline",
                },
                zIndex: 20,
                backgroundColor: "white",
            }}
            onClick={onClick}
        >
            {/*{JSON.stringify(item, null, 2)}*/}
            {description}
        </li>
    )
}

const Address = ({ address, setAddress, bg = "light_5" }) => {
    const { colors } = useMyTheme()
    const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
        usePlacesService({
            apiKey: places,
            debounce: 500,
        })

    //console.log({ address })
    useEffect(() => {
        // fetch place details for the first element in placePredictions array
        if (placePredictions.length) {
            console.log({ placePredictions })
            placesService?.getDetails(
                {
                    placeId: placePredictions[0].place_id,
                },
                placeDetails => console.log(placeDetails)
            )
        }
    }, [placePredictions, placesService])
    return (
        <Input
            label="Address (street, city, state)"
            placeholder="Address (street, city, state)"
            onChange={ev => {
                const input = ev.target.value
                getPlacePredictions({ input })
                setAddress(input)
            }}
            value={address}
        >
            <ul
                css={{
                    width: "100%",
                    position: "absolute",
                    top: 50,
                    left: 0,
                    backgroundColor: colors[bg],
                    borderRadius: "3px",
                    padding: "0px 5px",
                    //padding: "1rem",
                }}
            >
                {placePredictions.map(({ description, place_id, terms }, idx) => {
                    const text = description.split(", ").slice(0, -1).join(", ")
                    return (
                        <Li
                            key={place_id}
                            onClick={() => {
                                setAddress(text)
                            }}
                            description={text}
                            place_id={place_id}
                        />
                    )
                })}
            </ul>
        </Input>
    )
}

//
const createRecord = async ({ address, name, email, phone, experienced, why, urgency, referral }) =>
    await base("contact").create(
        [
            {
                fields: {
                    address,
                    name,
                    email,
                    phone,
                    experienced,
                    why,
                    urgency,
                    referral,
                },
            },
        ],
        function (err, records) {
            if (err) {
                console.error(err)
                return
            }
            records.forEach(function (record) {
                console.log(record.getId())
            })
        }
    )

export const ContactForm = () => {
    const [address, setAddress] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [experienced, setExperienced] = useState("")
    const [why, setWhy] = useState("")
    const [urgency, setUrgency] = useState("")
    const [referral, setReferral] = useState("")

    const { fonts, fontSizes, colors, fontWeights } = useMyTheme()
    return (
        <form
            css={{
                width: "100%",
            }}
            onSubmit={async ev => {
                ev.preventDefault()
                await createRecord({
                    address,
                    name,
                    email,
                    phone,
                    experienced,
                    why,
                    urgency,
                    referral,
                }).then(val => {
                    window.alert(
                        `Thank you ${
                            name.split(" ")[0]
                        }. We'll review your information and be in touch.`
                    )
                    run$.next({
                        ..._NAVIGATE,
                        [API.CMD_ARGS]: {
                            [API.URL_FULL]: ".",
                        },
                    })
                    window.history.pushState({}, null, "./")
                })
            }}
        >
            <Slab bg="light_5">
                <TextPanel>
                    <Input
                        label="Full Name*"
                        placeholder="Full Name"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                    />
                    <Input
                        label="Email*"
                        placeholder="Email"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <Input
                        label="Phone"
                        placeholder="Phone"
                        value={phone}
                        onChange={ev => setPhone(ev.target.value)}
                    />
                    <Address address={address} setAddress={setAddress} />
                </TextPanel>
                <TextPanel>
                    <Input
                        label="Have you renovated before? (Y/N)"
                        placeholder="no"
                        value={experienced}
                        onChange={ev => setExperienced(ev.target.value)}
                    />
                    <Input
                        label="Why do you need more space?"
                        placeholder="because..."
                        value={why}
                        onChange={ev => setWhy(ev.target.value)}
                    />
                    <Input
                        label="Is your need urgent? (Y/N)"
                        placeholder="because..."
                        value={urgency}
                        onChange={ev => setUrgency(ev.target.value)}
                    />
                    <Input
                        label="How did you hear about us?"
                        placeholder="referral"
                        value={referral}
                        onChange={ev => setReferral(ev.target.value)}
                    />
                    <input
                        type="submit"
                        value="Send"
                        css={{
                            backgroundColor: colors.dark_5,
                            fontSize: fontSizes.sm,
                            padding: "1rem 3rem",
                            fontFamily: fonts.sans,
                            borderRadius: "4px",
                            color: colors.light_5,
                            letterSpacing: letterSpacings.md,
                            fontWeight: fontWeights.black,
                            alignSelf: "end",
                            cursor: "pointer",
                        }}
                    />
                </TextPanel>
            </Slab>
        </form>
    )
}
