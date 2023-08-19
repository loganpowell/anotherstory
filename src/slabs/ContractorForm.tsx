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
import { Input, Address, DropDown } from "../components"
import Airtable from "airtable"
import { PopupModal } from "react-calendly"
//import vc from "vcards-js"
//import dotenv from "dotenv"

//dotenv.config()

const apiKey = import.meta.env.VITE_AIRTABLE
const places = import.meta.env.VITE_PLACES

//create a new vCard
//const vCard = vc()

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
    est,
    geos,
    referral,
    stage = "Schedule Intake Call",
    //vcard,
}) =>
    await base("contractor_intake").create(
        [
            {
                fields: {
                    address,
                    name,
                    email,
                    phone,
                    experienced,
                    est,
                    referral,
                    geos,
                    stage,
                    //vcard,
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

export const ContractorForm = () => {
    const [address, setAddress] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [experienced, setExperienced] = useState("")
    const [est, setEst] = useState("")
    const [referral, setReferral] = useState("")
    const [geos, setGeos] = useState("")
    const [isOpen, setIsOpen] = useState(false)

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
                const zip = address_parts[3]
                await createRecord({
                    address,
                    name,
                    email,
                    phone,
                    experienced,
                    est,
                    referral,
                    geos,
                }).then(val => {
                    setIsOpen(true)
                    //window.alert(
                    //    `Thank you ${first}. We'll review your information and be in touch.`
                    //)
                    //run$.next({
                    //    ..._NAVIGATE,
                    //    [API.CMD_ARGS]: {
                    //        [API.URL_FULL]: ".",
                    //    },
                    //})
                    //window.history.pushState({}, null, ".")
                })
            }}
        >
            <Slab bg="light_5" gap={["lg"]}>
                <TextPanel gap={["lg"]}>
                    <Input
                        label="Principal/Owner Name"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                    />
                    <Input label="Email" value={email} onChange={ev => setEmail(ev.target.value)} />
                    <Input label="Phone" value={phone} onChange={ev => setPhone(ev.target.value)} />
                    <Address address={address} setAddress={setAddress} />
                </TextPanel>
                <TextPanel gap={["lg"]}>
                    <Input
                        label="How did you hear about us?"
                        value={referral}
                        onChange={ev => setReferral(ev.target.value)}
                    />
                    <Input
                        label="In what year was your company established?"
                        value={est}
                        onChange={ev => setEst(ev.target.value)}
                    />
                    <Input
                        label="Which geographic areas do you serve?"
                        value={geos}
                        onChange={ev => setGeos(ev.target.value)}
                    />
                    <DropDown
                        label="Experienced with 2nd Story Additions?"
                        selection={experienced}
                        setSelection={setExperienced}
                        selections={["Yes", "No"]}
                    />

                    <input
                        type="submit"
                        value="Send"
                        css={{
                            backgroundColor: colors.dark_5,
                            fontSize: fontSizes.sm,
                            padding: "1rem 3rem",
                            fontFamily: fonts.sans,
                            borderRadius: "1rem",
                            color: colors.light_5,
                            //letterSpacing: letterSpacings.md,
                            fontWeight: fontWeights.black,
                            alignSelf: "end",
                            cursor: "pointer",
                        }}
                    />
                </TextPanel>
                <PopupModal
                    url="https://calendly.com/anotherstory/introduction"
                    rootElement={document.getElementById("root")}
                    open={isOpen}
                    onModalClose={() => {
                        run$.next({
                            ..._NAVIGATE,
                            [API.CMD_ARGS]: {
                                [API.URL_FULL]: ".",
                            },
                        })
                        window.history.pushState({}, null, ".")
                    }}
                    prefill={{
                        email,
                        name,
                        customAnswers: {
                            a1: est,
                        },
                    }}
                />
            </Slab>
        </form>
    )
}
