import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarProps {
  src: string;
  alt: string;
}
export function UserAvatar({ src, alt }: AvatarProps) {
  return (
    <Avatar className="w-10 h-10 text-white border-2 border-white overflow-hidden">
      <AvatarImage
        src={src}
        alt={alt}
        className="border-2 border-rose-200 overflow-hidden"
      />
      <AvatarFallback className="bg-emerald-400 border font-bold">
        U
      </AvatarFallback>
    </Avatar>
  );
}
