import { Timeline } from "@/components/ui/timeline";
import { Link } from "lucide-react";
 
export function TimelineDemo() {

  const data = [
    {
      title: "WEESHR",
      content: (
        <div>
          <div className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            <a href="https://weesshr.com" className="text-blue-500 hover:underline">
              <span className="flex text-blue-500 items-center gap-4">
                <span>https://weesshr.com</span>
                <Link className="h-4 w-4" />
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767309238/portfolio/Macbook-Air-weeshr.com_riifbw.png"
              alt="Weeshr desktop view"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767308975/portfolio/iPhone-13-PRO-weeshr.com_hh8yn0.png"
              alt="Weeshr mobile"
              width={500}
              height={500}
              className="h-20 w-fit rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Trinity DSTV",
      content: (
        <div>
          <div className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
           <a href="https://trinitydsl.com" className="text-blue-500 hover:underline">
               <span className="flex text-blue-500 items-center gap-4">
                  <span>https://trinitydsl.com</span>
                  <Link className="h-4 w-4"/>
                </span>
           </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767309176/portfolio/Macbook-Air-www.trinitydsl.com_mtijnn.png"
              alt="desktop template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767308963/portfolio/iPhone-13-PRO-www.trinitydsl.com_ixtksy.png"
              alt="mobile template"
              width={500}
              height={500}
              className="h-20 w-fit rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "WEESHR INVEST",
      content: (
        <div>
          <div className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
           <a href="https://invest.weeshr.com/" className="text-blue-500 hover:underline">
               <span className="flex text-blue-500 items-center gap-4">
                  <span>https://invest.weeshr.com</span>
                  <Link className="h-4 w-4"/>
                </span>
           </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767309078/portfolio/Macbook-Air-invest.weeshr.com_babmnv.png"
              alt="desktop template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767308913/portfolio/iPhone-13-PRO-invest.weeshr.com_pnbpry.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-fit rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Trinity Property Managment",
      content: (
        <div>
          <div className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
           <a href="https://property-management-blue.vercel.app" className="text-blue-500 hover:underline">
               <span className="flex text-blue-500 items-center gap-4">
                  <span>https://property-management-blue.vercel.app</span>
                  <Link className="h-4 w-4"/>
                </span>
           </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767309052/portfolio/Macbook-Air-property-management-blue.vercel.app_vt7otz.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767308929/portfolio/iPhone-13-PRO-property-management-blue.vercel.app_tbtoyo.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-fit rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Project 3Rs",
      content: (
        <div>
          <div className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
           <a href="https://project-3rs.vercel.app" className="text-blue-500 hover:underline">
               <span className="flex text-blue-500 items-center gap-4">
                  <span>https://project-3rs.vercel.app</span>
                  <Link className="h-4 w-4"/>
                </span>
           </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767309052/portfolio/Macbook-Air-project-3rs.vercel.app_ztmrgn.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767309051/portfolio/Macbook-Air-project-3rs.vercel.app_1_e6652k.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767308876/portfolio/iPad-Air-4-project-3rs.vercel.app_chlngo.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-fit rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767308938/portfolio/iPhone-13-PRO-project-3rs.vercel.app_a8tjyj.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-fit rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "AED",
      content: (
        <div>
          <div className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
           <a href="https://aed-fe.vercel.app" className="text-blue-500 hover:underline">
               <span className="flex text-blue-500 items-center gap-4">
                  <span>https://aed-fe.vercel.app</span>
                  <Link className="h-4 w-4"/>
                </span>
           </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767309025/portfolio/Macbook-Air-aed-fe_xctib3.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767309007/portfolio/Macbook-Air-aed-fe.vercel.app_1_kxmhqv.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
             <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767308877/portfolio/iPhone-13-aed-fe_qdoobm.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-fit rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Ellies Jewelry",
      content: (
        <div>
          <div className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
           <a href="ellies-omega.vercel.app" className="text-blue-500 hover:underline">
               <span className="flex text-blue-500 items-center gap-4">
                  <span>ellies-omega.vercel.app</span>
                  <Link className="h-4 w-4"/>
                </span>
           </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767309007/portfolio/Macbook-Air-ellies-omega.vercel.app_qyto1y.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767308965/portfolio/iPhone-14-Plus-ellies-omega.vercel.app_eevsve.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-fit rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767309176/portfolio/Samsung-Galaxy-S20-ellies-omega.vercel.app_z828ug.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-fit rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767308844/portfolio/Galaxy-Tab-S7-ellies-omega.vercel.app_pzgitk.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-fit rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "HEMIIFY",
      content: (
        <div>
          <div className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
           <a href="https://hemify.vercel.app" className="text-blue-500 hover:underline">
               <span className="flex text-blue-500 items-center gap-4">
                  <span>https://hemify.vercel.app</span>
                  <Link className="h-4 w-4"/>
                </span>
           </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767309008/portfolio/Macbook-Air-hemify.vercel.app_z7tmgi.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://res.cloudinary.com/dotojp6xu/image/upload/v1767308914/portfolio/iPhone-13-PRO-hemify.vercel.app_xhtxq0.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-fit rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    }
  ];
  return (
    <div id="projects" className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}