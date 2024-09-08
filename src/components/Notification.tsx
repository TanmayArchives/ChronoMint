import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion } from 'framer-motion'

type NotificationType = 'success' | 'error' | 'info'

export default function Notification({ message, type }: { message: string; type: NotificationType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
    >
      <Alert variant={type === 'error' ? 'destructive' : 'default'}>
        <AlertTitle>{type.charAt(0).toUpperCase() + type.slice(1)}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </motion.div>
  )
}