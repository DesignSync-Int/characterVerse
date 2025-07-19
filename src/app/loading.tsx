export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto animate-pulse">
          <span className="text-white font-bold text-lg">CV</span>
        </div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Loading CharacterVerse</h2>
        <p className="text-slate-600">Preparing your character adventure...</p>
      </div>
    </div>
  )
}
