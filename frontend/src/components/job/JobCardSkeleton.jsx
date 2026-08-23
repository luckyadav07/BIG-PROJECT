import Card from "../common/Card.jsx";
import Skeleton from "../common/Skeleton.jsx";

function JobCardSkeleton() {
  return (
    <Card className="flex flex-col h-full !p-5 border border-white/5 relative">
      {/* Top Section: Logo & Details */}
      <div className="flex items-start gap-4 mb-4">
        <Skeleton width="48px" height="48px" className="!rounded-xl shrink-0" />
        <div className="flex-1 min-w-0 space-y-2 mt-1">
          <Skeleton height="16px" width="70%" />
          <Skeleton height="12px" width="40%" />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Skeleton width="60px" height="22px" className="!rounded-full" />
          <Skeleton width="32px" height="32px" className="!rounded-xl" />
        </div>
      </div>

      {/* Middle Section: Meta Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Skeleton width="75px" height="22px" className="!rounded-full" />
        <Skeleton width="85px" height="22px" className="!rounded-full" />
        <Skeleton width="65px" height="22px" className="!rounded-full" />
        <Skeleton width="80px" height="22px" className="!rounded-full" />
      </div>

      {/* Skills Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
        <Skeleton width="60px" height="24px" className="!rounded-lg" />
        <Skeleton width="75px" height="24px" className="!rounded-lg" />
        <Skeleton width="55px" height="24px" className="!rounded-lg" />
      </div>

      {/* Bottom Section: Footer Actions */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t" style={{ borderColor: "var(--border-color)" }}>
        <Skeleton width="90px" height="12px" />
        <Skeleton width="110px" height="32px" className="!rounded-lg" />
      </div>
    </Card>
  );
}

export default JobCardSkeleton;
