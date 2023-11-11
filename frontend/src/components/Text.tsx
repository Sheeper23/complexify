"use client"

export default function Text() {
  return (
    <div className="h-12 w-full flex rounded-full bg-neutral-700 items-center px-4">
        <input
        type="text"
        placeholder="Awaiting your drawing..."
        spellCheck={false}
        maxLength={800}
        autoCapitalize="off"
        autoCorrect="off"
        className="grow outline-none bg-transparent text-sm"
        />
    </div>
  )
}
