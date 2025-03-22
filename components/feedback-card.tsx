import { Card, CardContent } from "@/components/ui/card"
import { CheckCircleIcon, XCircleIcon, AlertCircleIcon, InfoIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeedbackCardProps {
  title?: string
  content: string
  type?: "positive" | "negative" | "warning" | "info"
}

export function FeedbackCard({ title, content, type = "info" }: FeedbackCardProps) {
  const getIcon = () => {
    switch (type) {
      case "positive":
        return <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
      case "negative":
        return <XCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
      case "warning":
        return <AlertCircleIcon className="h-5 w-5 text-amber-500 flex-shrink-0" />
      case "info":
      default:
        return <InfoIcon className="h-5 w-5 text-blue-500 flex-shrink-0" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case "positive":
        return "bg-green-500/5"
      case "negative":
        return "bg-red-500/5"
      case "warning":
        return "bg-amber-500/5"
      case "info":
      default:
        return "bg-blue-500/5"
    }
  }

  const getBorderColor = () => {
    switch (type) {
      case "positive":
        return "border-green-500/20"
      case "negative":
        return "border-red-500/20"
      case "warning":
        return "border-amber-500/20"
      case "info":
      default:
        return "border-blue-500/20"
    }
  }

  return (
    <Card className={cn("border transition-all duration-200 hover:shadow-md", getBorderColor(), getBgColor())}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          {getIcon()}
          <div>
            {title && <h4 className="font-medium mb-1">{title}</h4>}
            <p className="text-sm text-muted-foreground">{content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

