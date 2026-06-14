import { AllProviders } from "data"
// import Link01 from "./../src/ui/blocks/links/link-01";
import  SdsDemo from "./ui/blocks/examples/demo-01"
import { ModeToggle } from "compositions"

export default function App() {
  return (
    <AllProviders>
      <div className="fixed z-20 left-4 right-4">
        <ModeToggle />
      </div>
      <SdsDemo />
    </AllProviders>
  )
}