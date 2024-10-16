import { SyntheticEvent } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


interface KeyValuePair {
    entryId: string
    address: string[]
}
type Props = {
    formatAddress: (e: SyntheticEvent) => void;
    setAddress: (e: SyntheticEvent) => void;
    formattedAddress: KeyValuePair[];
    copyToClipboard: (e: SyntheticEvent) => void;
    formatRowOutput: (address: KeyValuePair, lang: string) => JSX.Element
}

const TextInput = ({ formatAddress, formattedAddress, setAddress, copyToClipboard, formatRowOutput }: Props) => {
    return (
        <>
            <form onSubmit={formatAddress} className='flex flex-col gap-4 w-1/2'>
                <Textarea className="min-w-24 w-full h-96" name="" id="" onChange={setAddress} placeholder='Paste data here'></Textarea>

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
                                    <>
                                        {formatRowOutput(address, 'E')}
                                        {formatRowOutput(address, 'F')}
                                    </>
                                )
                            })
                        }
                    </TableBody>

                </Table>

            </form>
        </>
    )
}

export default TextInput;