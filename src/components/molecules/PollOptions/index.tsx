"use client"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PollOption } from "@/models/polls"
import classes from "classnames"
import { User2 } from "lucide-react"
import React, { useEffect, useState } from "react"

type Props = {
  options?: PollOption[]
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
}

export default function PollOptions({ options = [], value, defaultValue, onChange }: Props) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>()

  const handleChangeValue = (val: string) => {
    if (val !== null) {
      setSelectedValue(val)
      onChange && onChange(Number(val))
    }
  }

  useEffect(() => {
    setSelectedValue(value?.toString())
  }, [value])

  return (
    <RadioGroup
      className="flex flex-col gap-7"
      value={selectedValue}
      defaultValue={defaultValue?.toString()}
      onValueChange={handleChangeValue}
    >
      {options.map((option, index) => (
        <Label
          key={option + "_" + index + 1}
          htmlFor={(index + 1).toString()}
          className={classes(
            "flex flex-col gap-4 cursor-pointer border-2 border-solid border-border rounded-xl px-5 py-3",
            {
              "border-primary": (index + 1).toString() === selectedValue
            }
          )}
        >
          <div className="flex justify-between">
            <div className="flex space-x-5 items-center">
              <RadioGroupItem value={(index + 1).toString()} id={(index + 1).toString()} />
              <span className="font-medium leading-5">{option.label}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1"><User2 className="w-3 h-3"/><span className="text-sm">{option.count}</span></div>
              <b>{option.percent}%</b>
            </div>
          </div>
          <Progress value={option.percent} className="h-[8px] bg-secondaryBackground" />
        </Label>
      ))}
    </RadioGroup>
  )
}
