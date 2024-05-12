

export default function ChatLayout( { children }: { children: React.ReactNode }) {

    return (
        <main className="flex min-h-screen p-10 ">
            {children}
        </main>
    )
}