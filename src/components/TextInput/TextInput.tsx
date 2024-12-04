import React, { SyntheticEvent } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"


interface KeyValuePair {
    entryId: string
    address: string[]
}
type Props = {
    formatAddress: (e: SyntheticEvent) => void
    setAddress: (e: SyntheticEvent) => void
    formattedAddress: KeyValuePair[]
    copyToClipboard: (e: SyntheticEvent) => void
    formatRowOutput: (address: KeyValuePair, lang: string) => JSX.Element
    changeCharLength: (e: React.ChangeEvent<HTMLInputElement>) => void
    charLength: number
}

const TextInput = ({ formatAddress, formattedAddress, charLength, setAddress, copyToClipboard, formatRowOutput, changeCharLength }: Props) => {
    return (
        <>
            <form onSubmit={formatAddress} className='flex flex-col gap-4 w-1/2'>
                <Textarea className="min-w-24 w-full h-96" name="" id="" onChange={setAddress} placeholder='Paste data here'></Textarea>
                <Input type="text" placeholder='34' onChange={changeCharLength} value={charLength} />
                <Button type="submit">Format</Button>
            </form>
            <form onSubmit={copyToClipboard} className='mt-8 flex flex-col gap-4 w-1/2'>
                <Button type="submit" value="Copy to Clipboard">Copy to Clipboard</Button>
                <Table >
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Language</TableHead>
                            <TableHead>Line Number</TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {
                            formattedAddress &&
                            formattedAddress.map((address) => {
                                return (
                                    <React.Fragment key={address.entryId}>
                                        {formatRowOutput(address, 'E')}
                                        {formatRowOutput(address, 'F')}
                                    </React.Fragment>
                                )
                            })
                        }
                    </TableBody>

                </Table>
            </form>
        </>
    )
}

export default TextInput