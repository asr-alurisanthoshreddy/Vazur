import { Suspense } from "react"
import { AIHighlightReel } from "./components/AIHighlightReel"
import { VirtualDugout } from "./components/VirtualDugout"
import { PredictiveAnalytics } from "./components/PredictiveAnalytics"
import { FanInteractionHub } from "./components/FanInteractionHub"
import { PersonalizedInsights } from "./components/PersonalizedInsights"
import { ClipLoader } from "react-spinners";



export default function Home() {
  return (
    <div className="space-y-8">
      

      <Suspense fallback={<ClipLoader color="#36D7B7" size={50} />}>
        <AIHighlightReel />
      </Suspense>

      <Suspense fallback={<ClipLoader color="#36D7B7" size={50} />}>
        <VirtualDugout />
      </Suspense>

      <Suspense fallback={<ClipLoader color="#36D7B7" size={50} />}>
        <PredictiveAnalytics />
      </Suspense>

      <Suspense fallback={<ClipLoader color="#36D7B7" size={50} />}>
        <FanInteractionHub />
      </Suspense>
      <Suspense fallback={<ClipLoader color="#36D7B7" size={50} />}>
        <PersonalizedInsights />
      </Suspense>
      
    </div>
  )
}

