'use client'

import { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { SortAsc, SortDesc, Filter } from 'lucide-react'

interface SortSelectProps {
    defaultValue?: string
}

const sortingOptions = [
    { value: 'date-asc', label: 'Date: Newest to Oldest', icon: SortAsc },
    { value: 'date-desc', label: 'Date: Oldest to Newest', icon: SortDesc },
    { value: 'price-asc', label: 'Price: Lowest to Highest', icon: SortAsc },
    { value: 'price-desc', label: 'Price: Highest to Lowest', icon: SortDesc },
]

export default function SortSelect({ defaultValue }: SortSelectProps) {
    const [value, setValue] = useState<string | undefined>(
        defaultValue && defaultValue !== '' ? defaultValue : undefined
    )

    return (
        <>
            <Select value={value} onValueChange={(val) => setValue(val)}>
                <SelectTrigger className="w-full md:w-56 dark:bg-gray-800 dark:border-gray-700 flex justify-between items-center">
                    <SelectValue placeholder="Sort by" />
                    <Filter className="ml-2 h-4 w-4 opacity-70" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                    {sortingOptions.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                            className="flex items-center space-x-2"
                        >
                            <div className="flex-shrink-0">
                                <option.icon className="h-4 w-4" />
                            </div>
                            <div>
                                <span>{option.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {/* Hidden input to include the selected sort value in the GET form submission */}
            <input type="hidden" name="sort" value={value || ''} />
        </>
    )
}
