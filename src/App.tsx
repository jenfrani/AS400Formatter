import { SyntheticEvent, useEffect, useState } from "react"
import TextInput from "./Components/TextInput/TextInput"
function App() {

  interface KeyValuePair {
    entryId: string
    address: string[]
  }

  const [formattedAddress, setFormattedAddress] = useState<KeyValuePair[]>([]);
  const [address, setAddress] = useState("")

  const formatAddress = (e: SyntheticEvent) => {
    e.preventDefault()
    // we want to loop through each line of the textarea value

    const lines = address.split("\n")

    const addressLines: KeyValuePair[] = lines.map((line) => {
      // first token (separated by a tab) is the entry ID
      const entryId = line.split("\t")[0]
      // second token (the rest of the line) is the actual address
      const address = line.split("\t")[1]

      // split the address into lines with 34 characters
      const chunks = [];

      for (let i = 0; i < address.length; i += 34) {
        chunks.push(address.slice(i, i + 34));
      }

      return {
        entryId: entryId,
        address: chunks
      }
    })

    setFormattedAddress(addressLines);


  }

  const setAddressHandler = (e: any) => {
    e.preventDefault()
    setAddress(e.target.value)
  }

  useEffect(() => {
    // console.log(address)
    console.log(formattedAddress)
  }, [address, formattedAddress]);

  const copyToClipboard = (e: SyntheticEvent, formattedAddress: KeyValuePair[]) => {
    e.preventDefault()
    const clipboardAddress = `
     <table>
      ${formattedAddress.map((line) => {
      return `
          <tr>
            <td style="background-color: #f2f2f2; color: #333">${line.entryId}</td>
            <td>${line.address.map((addressLine, index) => {
        if (index === 0) {
          return addressLine;
        } else {
          return `<br>${addressLine}`;
        }
      }).join('')}</td>
          </tr>
        `;
    }).join('')}
    </table>
  `;
    navigator.clipboard.writeText(JSON.stringify(clipboardAddress))
  }
  // const copyToClipboard = (e: SyntheticEvent, formattedAddress: KeyValuePair[]) => {
  //   e.preventDefault()
  //   const clipboardAddress = `
  //    <table>
  //     ${formattedAddress.map((line) => {
  //     return `
  //         <tr>
  //           <td style="background-color: #f2f2f2; color: #333">${line.entryId}</td>
  //           <td>${line.address.map((addressLine, index) => {
  //       if (index === 0) {
  //         return addressLine;
  //       } else {
  //         return `<br>${addressLine}`;
  //       }
  //     }).join('')}</td>
  //         </tr>
  //       `;
  //   }).join('')}
  //   </table>
  // `;
  // const tableDoc = document.createElement('table');

  // tableDoc.innerHTML = clipboardAddress;
  //   const doc = document.implementation.createHTMLDocument('');
  //   doc.body.appendChild(tableDoc.cloneNode(true));

  //   // Create a Blob with the HTML content
  //   const blob = new Blob([doc.documentElement.outerHTML], { type: 'text/html' });

  //   // Create a new ClipboardItem with the Blob
  //   const clipboardItem = new ClipboardItem({ 'text/html': blob });

  //   navigator.clipboard.write([clipboardItem]).then(() => {
  //     console.log('Table copied with styling');
  //   }).catch(err => {
  //     console.error('Failed to copy table: ', err);
  //   });
  //   // navigator.clipboard.writeText(JSON.stringify(clipboardAddress))
  // }

  return (
    <>
      <TextInput copyToClipboard={(e) => copyToClipboard(e, formattedAddress)} formatAddress={formatAddress} setAddress={setAddressHandler} formattedAddress={formattedAddress}></TextInput>
    </>
  )
}

export default App
