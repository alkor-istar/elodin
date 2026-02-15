
const Caption = () => {

    return (
        <section className="h-56 p-4 flex flex-col gap-3 bg-white">
            <textarea
                className="flex-1 resize-none rounded-md border p-3 text-sm
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Image description..."
            />

        </section>
    )
}

export default Caption; 