import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Loader2, SearchIcon } from "lucide-react"
import React, { useState } from "react"

type Props = {
  value?: string
  onChange?: (value: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  const [searchValue, setSearchValueValue] = useState<string>(value || "")

  const handleSubmit = (e:any) => {
    e.preventDefault()
    onChange && onChange(searchValue)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center space-x-2 border-2 border-solid border-border rounded-full px-3 bg-secondaryBackground"
    >
      <SearchIcon className="ml-2" />
      <Input
        type="number"
        className="flex-1 bg-transparent border-0 hide-arrow focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Enter code here"
        onChange={(e) => setSearchValueValue(e.target.value)}
      />
      <Button type="submit" className="rounded-full" size="icon">
        <ArrowRight />
        {/* <Loader2 className="m-auto h-6 w-6 animate-spin" /> */}
      </Button>
    </form>
  )
}
