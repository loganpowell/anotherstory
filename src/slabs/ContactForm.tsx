/** @jsxImportSource @emotion/react */

import React, {
    CSSProperties,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react"
import { Slab, TextPanel } from "../containers"
import { useMyTheme } from "../hooks"
import { run$ } from "@-0/spool"
import { _NAVIGATE } from "../context"
import { API } from "@-0/browser"
import { Input, Address } from "../components"
import Airtable from "airtable"
import vc from "vcards-js"
import dotenv from "dotenv"

dotenv.config()

const apiKey = process.env.REACT_APP_AIRTABLE
const places = process.env.REACT_APP_PLACES

//create a new vCard
const vCard = vc()

//save to file

//get as formatted string

//console.log({ apiKey })
const base = new Airtable({
    apiKey,
}).base("appK6q2gwVCCc0gmF")

const createRecord = async ({
    address,
    name,
    email,
    phone,
    experienced,
    why,
    urgency,
    referral,
    vcard,
}) =>
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
                    vcard,
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

    const { fonts, fontSizes, colors, fontWeights, letterSpacings } = useMyTheme()
    return (
        <form
            css={{
                width: "100%",
            }}
            onSubmit={async ev => {
                ev.preventDefault()
                // name
                const name_parts = name.trim().split(" ")
                let first = name_parts[0],
                    middle,
                    last
                if (name_parts.length === 3) {
                    middle = name_parts[1]
                    last = name_parts[2]
                }
                if (name_parts.length === 2) {
                    middle = ""
                    last = name_parts[1]
                }

                // address
                const address_parts = address.trim().split(", ")
                const street = address_parts[0]
                const city = address_parts[1]
                const state = address_parts[2]

                //set properties
                vCard.firstName = first
                vCard.middleName = middle
                vCard.lastName = last
                vCard.cellPhone = phone
                vCard.homeAddress.label = "Home Address"
                vCard.homeAddress.street = street
                vCard.homeAddress.city = city
                vCard.homeAddress.stateProvince = state
                vCard.note = why

                const vcard = vCard.getFormattedString()
                console.log({ vcard })
                await createRecord({
                    address,
                    name,
                    email,
                    phone,
                    experienced,
                    why,
                    urgency,
                    referral,
                    vcard: vCard,
                }).then(val => {
                    window.alert(
                        `Thank you ${first}. We'll review your information and be in touch.`
                    )
                    run$.next({
                        ..._NAVIGATE,
                        [API.CMD_ARGS]: {
                            [API.URL_FULL]: ".",
                        },
                    })
                    window.history.pushState({}, null, ".")
                })
            }}
        >
            <Slab bg="light_5" gap={["lg"]}>
                <TextPanel gap={["lg"]}>
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
                <TextPanel gap={["lg"]}>
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
