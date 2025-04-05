export function BadgeCard({ badge, unlocked }) {
    if (badge.category === "profile") { unlocked = true;}
  
    return (
      <div
      className={`p-4 rounded-lg border ${
        unlocked
          ? "bg-white border-[#dcd7fe]"
          : "bg-[#f3f4f6] border-[#e5e7eb] opacity-70"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
            unlocked ? "bg-[#efedff]" : "bg-[#e5e7eb]"
          }`}
        >
          <span role="img" aria-label={badge.title}>
            {badge.icon}
          </span>
        </div>
        <div className="flex-1">
          <h3
            className={`font-bold text-lg ${
              unlocked ? "text-[#351471]" : "text-[#6b7280]"
            }`}
          >
            {badge.title}
          </h3>
          <p
            className={`text-sm ${
              unlocked ? "text-[#556070]" : "text-[#6b7280]"
            }`}
          >
            {badge.description}
          </p>
          {!unlocked && (
            <div className="mt-2 text-xs text-[#7641d9] bg-[#efedff] p-2 rounded">
              <span className="font-medium">Come sbloccare:</span> {badge.unlockCondition}
            </div>
          )}
        </div>
      </div>
    </div>
    );
  }
  