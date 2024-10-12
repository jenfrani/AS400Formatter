import { SyntheticEvent } from 'react';

interface KeyValuePair {
    entryId: string
    address: string[]
}
type Props = {
    formatAddress: (e: SyntheticEvent) => void;
    setAddress: (e: SyntheticEvent) => void;
    formattedAddress: KeyValuePair[];
    copyToClipboard: (e: SyntheticEvent) => void;
}

const TextInput = ({ formatAddress, formattedAddress, setAddress, copyToClipboard }: Props) => {
    return (
        <>
            <form onSubmit={formatAddress}>
                <textarea name="" id="" onChange={setAddress} ></textarea>

                <input type="submit" value="Format" />
            </form>
            <form onSubmit={copyToClipboard}>
                <table style={{ whiteSpace: 'pre' }}>
                    <thead>
                        <tr>
                            <td style={{ width: '30%' }}>ID</td>
                            <td>Address</td>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            formattedAddress &&
                            formattedAddress.map((address) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{address.entryId}</td>
                                            <td>{address.address[0]}</td>
                                        </tr>
                                        {address.address.slice(1).map((line) => {
                                            return (
                                            <tr>
                                                <td></td>
                                                <td>{line.trim()}</td>
                                            </tr>)
                                        })}
                                    </>
                                )
                            })
                        }
                    </tbody>

                </table>

                <input type="submit" value="Copy to Clipboard" />
            </form>
        </>
    )
}

export default TextInput;