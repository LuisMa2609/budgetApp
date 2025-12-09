// 'use client'

import { AlertDialog } from "@radix-ui/react-alert-dialog"
import { Button } from "@/components/ui/button"
import { Text } from "lucide-react"
// import { useState } from "react"

const AlertDialog_ = () => {
	const [open, setOpen] = useState(true)
	console.log("alert dialog triggered")
	return (
	<AlertDialog.Root open={open} onOpenChange={setOpen}>
		<AlertDialog.Trigger />
		<AlertDialog.Portal>
			<AlertDialog.Overlay />
			<AlertDialog.Content>
				<AlertDialog.Title />
				<AlertDialog.Description />
				<AlertDialog.Cancel />
				<AlertDialog.Action />
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
	)
}

export { AlertDialog_ };