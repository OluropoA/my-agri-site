"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { Search, Calculator, Calendar, CreditCard, Settings, User, FileText, Home, LineChart, FlaskConical } from "lucide-react"

export function CommandPalette() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false)
        command()
    }, [])

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in fade-in zoom-in duration-200">
                <Command className="w-full">
                    <div className="flex items-center border-b px-3 dark:border-zinc-800">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <Command.Input
                            placeholder="Type a command or search..."
                            className="flex h-12 w-full rouned-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-50"
                        />
                    </div>
                    <Command.List className="max-h-[300px] overflow-y-auto px-2 py-2">
                        <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>

                        <Command.Group heading="Navigation" className="text-xs font-medium text-zinc-500 px-2 py-1.5">
                            <Command.Item
                                onSelect={() => runCommand(() => router.push('/'))}
                                className="flex items-center px-2 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-sm"
                            >
                                <Home className="mr-2 h-4 w-4" />
                                <span>Home</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push('/about'))}
                                className="flex items-center px-2 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-sm"
                            >
                                <User className="mr-2 h-4 w-4" />
                                <span>About Me</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push('/research'))}
                                className="flex items-center px-2 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-sm"
                            >
                                <FlaskConical className="mr-2 h-4 w-4" />
                                <span>Research Highlights</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push('/market-watch'))}
                                className="flex items-center px-2 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-sm"
                            >
                                <LineChart className="mr-2 h-4 w-4" />
                                <span>Market Watch Data</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push('/blog'))}
                                className="flex items-center px-2 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-sm"
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Blog & Articles</span>
                            </Command.Item>
                        </Command.Group>

                        <Command.Separator className="my-1 h-px bg-zinc-200 dark:bg-zinc-800" />

                        <Command.Group heading="Actions" className="text-xs font-medium text-zinc-500 px-2 py-1.5">
                            <Command.Item
                                onSelect={() => runCommand(() => window.print())}
                                className="flex items-center px-2 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-sm"
                            >
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Print this page</span>
                            </Command.Item>
                        </Command.Group>
                    </Command.List>
                </Command>
            </div>
        </div>
    )
}
