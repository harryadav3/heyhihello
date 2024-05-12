
    import Sidebar from '@/components/Sidebar';
    import ChatInterface from '@/components/ChatInterface';


export default function Chat() {
    return (
        <main className="w-full flex bg-green">
        <aside className="min-w-96">
          <Sidebar />
        </aside>
        <div className="flex-grow  bg-red-500">
          <ChatInterface />
        </div>
      </main>
    )
}