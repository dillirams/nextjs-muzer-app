export function EnterEmail(){
    return <div className="w-full p-2 flex">
        <input type="email" placeholder="enter email" className="rounded-lg px-3 border py-2 shadow-xl/30"/>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">send</button>
    </div>
}