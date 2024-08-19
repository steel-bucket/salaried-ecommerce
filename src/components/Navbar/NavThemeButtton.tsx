'use client'
import { useTheme } from 'next-themes'
import { Icons } from '@/components/Icons'

const NavThemeButton = () => {
    const { theme, setTheme } = useTheme()
    return (
        <button
            onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
            }}
        >
            <Icons.moon className="h-10 w-10" />
        </button>
    )
}
export default NavThemeButton
