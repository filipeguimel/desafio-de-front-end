
export function Line({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="2" height="35" viewBox="0 0 2 35" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
        <path d="M1 1.5L0.999 33.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="currentColor" />
    </svg>
  );
}
