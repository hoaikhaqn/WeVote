import React from "react"
import { Loader2, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Props = {
  closePollDisabled?: boolean
  onClosePoll?: () => void
}

export default function PollMoreActions({ closePollDisabled = false, onClosePoll }: Props) {
  const handleAcceptClosePoll = () => {
    onClosePoll && onClosePoll()
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="rounded-full hover:bg-secondaryBackground" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-background">
          <DropdownMenuItem className="cursor-pointer" disabled={closePollDisabled}>
            <DialogTrigger>Close poll</DialogTrigger>
          </DropdownMenuItem>
          {/* <DropdownMenuItem disabled className="cursor-pointer text-danger">
            Delete poll
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to close this poll?</DialogTitle>
          <DialogDescription>
            This poll will not accept any more votes and everyone can still access and view the results.
          </DialogDescription>
          <DialogFooter className="justify-end">
            <DialogClose asChild>
              <Button type="button" className="opacity-50" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={handleAcceptClosePoll}>
                Accept
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
