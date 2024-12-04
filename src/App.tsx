import { SyntheticEvent, useState } from "react"

import {
  TableRow,
  TableCell
} from "@/components/ui/table"

import TextInput from "@/components/TextInput/TextInput"

function App() {

  interface KeyValuePair {
    entryId: string
    address: string[]
  }

  const [formattedAddress, setFormattedAddress] = useState<KeyValuePair[]>([])
  const [address, setAddress] = useState("")
  const [charLength, setCharLength] = useState(34)


  const tokenizeText = (text: string, maxLineLength: number = 34): string[] => {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      if (currentLine.length + word.length + 1 <= maxLineLength) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        currentLine = word;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  const formatAddress = (e: SyntheticEvent) => {
    e.preventDefault()
    // we want to loop through each line of the textarea value

    const lines = address.split("\n")

    // remove the last line if it is empty
    if (lines[lines.length - 1] === "") {
      lines.pop()
    }

    const addressLines: KeyValuePair[] = lines.map((line) => {
      // serialize the line

      // first token (separated by a tab) is the entry ID
      const entryId = line.split("\t")[0]
      // second token (the rest of the line) is the actual address
      const address = line.split("\t")[1]

      // split the address into lines with 34 characters
      let chunks: string[] = []

      chunks = tokenizeText(address, charLength)

      return {
        entryId: entryId,
        address: chunks
      }
    })

    setFormattedAddress(addressLines)

  }

  const setAddressHandler = (e: any) => {
    e.preventDefault()
    setAddress(e.target.value)
  }

  const formatRowOutput = (address: KeyValuePair, lang: string) => {
    return (
      <>
        {address.address.map((line, index) => {
          return (
            <TableRow key={index} className={
              index === 0 ? 'border-t' : ''
            }>
              <TableCell>{address.entryId}</TableCell>
              <TableCell>{lang}</TableCell>
              <TableCell>{index < 1 ? '' : index.toString().padStart(2, '0')}</TableCell>
              <TableCell>{line.trim()}</TableCell>
            </TableRow>
          )
        })}
      </>
    )
  }

  const copyToClipboard = (e: SyntheticEvent) => {
    e.preventDefault()
    // copy the contents of the table to the clipboard
    // get the table element
    const table = document.querySelector('table')
    let clipboardString = ''

    if (table) {
      // loop through each row in the table
      const rows = table.querySelectorAll('tr')
      rows.forEach((row) => {
        // loop through each cell in the row
        const cells = row.querySelectorAll('td')
        cells.forEach((cell) => {
          clipboardString += cell.textContent + '\t'
        })
        clipboardString += '\n'
      })
    }
    navigator.clipboard.writeText(clipboardString)
  }

  const changeCharLength = (e: SyntheticEvent) => {
    setCharLength(parseInt(e.target.value)) 
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full my-12">
      <TextInput copyToClipboard={copyToClipboard}
        formatAddress={formatAddress} setAddress={setAddressHandler} formattedAddress={formattedAddress}
        formatRowOutput={formatRowOutput} changeCharLength={changeCharLength} charLength={charLength}/>
    </main>
  )
}

export default App
