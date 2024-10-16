import { SyntheticEvent, useEffect, useState } from "react"

import {
  TableRow,
  TableCell
} from "@/components/ui/table"

import TextInput from "./components/TextInput/TextInput"

function App() {

  interface KeyValuePair {
    entryId: string
    address: string[]
  }

  const [formattedAddress, setFormattedAddress] = useState<KeyValuePair[]>([])
  const [address, setAddress] = useState("")

  const formatAddress = (e: SyntheticEvent) => {
    e.preventDefault()
    // we want to loop through each line of the textarea value

    const lines = address.split("\n")

    // remove the last line if it is empty
    if (lines[lines.length - 1] === "") {
      lines.pop()
    }

    const addressLines: KeyValuePair[] = lines.map((line) => {
      // first token (separated by a tab) is the entry ID
      const entryId = line.split("\t")[0]
      // second token (the rest of the line) is the actual address
      const address = line.split("\t")[1]

      // split the address into lines with 34 characters
      const chunks: string[] = []

      // split the address into chunks of spaces
      const addressChunks = address.split(" ")
      // loop through each chunk
      let stack : string[] = []

      addressChunks.forEach((chunk) => {
        // add chunks to a temp string until it reaches 34 characters

        if (stack.join(' ').length > 34) {
          chunks.push(stack.slice(0, stack.length - 1).join(' '))
          stack = stack.slice(stack.length - 1)

          stack.push(chunk)
        } else {
          stack.push(chunk)
        }

      })

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

  useEffect(() => {
    // console.log(address)
    console.log(formattedAddress)
  }, [address, formattedAddress])

  const formatRowOutput = (address: KeyValuePair, lang: string) => {
    return (
      <>
        {address.address.map((line, index) => {
          return (
            <TableRow className={
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
          clipboardString += "'" + cell.textContent + '\t'
        })
        clipboardString += '\n'
      })
    }
    navigator.clipboard.writeText(clipboardString)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full my-12">
      <TextInput copyToClipboard={copyToClipboard}
        formatAddress={formatAddress} setAddress={setAddressHandler} formattedAddress={formattedAddress}
        formatRowOutput={formatRowOutput} />
    </main>
  )
}

export default App
