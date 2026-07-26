import Card from "../common/Card.jsx";
import Skeleton from "../common/Skeleton.jsx";

function JobCardSkeleton() {
  return (
    <Card className="!p-5">
      <div className="mb-4 flex items-start gap-3">
        <Skeleton width="44px" height="44px" className="!rounded-xl shrink-0" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton height="18px" width="75%" />
          <Skeleton height="14px" width="45%" />
        </div>
        <Skeleton width="64px" height="24px" className="!rounded-full shrink-0" />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Skeleton width="80px" height="22px" className="!rounded-full" />
        <Skeleton width="96px" height="22px" className="!rounded-full" />
        <Skeleton width="72px" height="22px" className="!rounded-full" />
      </div>

      <div className="mb-4 flex gap-1.5">
        <Skeleton width="56px" height="24px" className="!rounded-md" />
        <Skeleton width="64px" height="24px" className="!rounded-md" />
        <Skeleton width="48px" height="24px" className="!rounded-md" />
      </div>

      <div className="flex gap-2">
        <Skeleton height="36px" className="flex-1" />
        <Skeleton width="36px" height="36px" className="!rounded-xl shrink-0" />
      </div>
    </Card>
  );
}

export default JobCardSkeleton;
