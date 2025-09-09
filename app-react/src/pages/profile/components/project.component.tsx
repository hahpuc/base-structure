import { useState } from 'react';

const ProjectList: React.FunctionComponent = () => {
  return (
    <div id="teams_list">
      <div className="flex flex-col gap-5 lg:gap-7.5">
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex flex-wrap justify-between items-center gap-7">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center size-14 shrink-0 rounded-full ring-1 ring-input bg-accent/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-ghost text-2xl text-secondary-foreground"
                  aria-hidden="true"
                >
                  <path d="M9 10h.01" />
                  <path d="M15 10h.01" />
                  <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" />
                </svg>
              </div>
              <div className="grid grid-col gap-1">
                <a
                  className="text-base font-medium text-mono hover:text-primary-active mb-px"
                  href="/metronic/tailwind/react/demo1/public-profile/teams"
                  data-discover="true"
                >
                  Pixel Crafters
                </a>
                <span className="text-sm text-secondary-foreground">
                  Crafting digital experiences for the world
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 lg:gap-12">
              <div className="grid gap-5 justify-end lg:text-end">
                <span className="text-xs font-normal text-muted-foreground uppercase">skills</span>
                <div className="flex gap-1.5">
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Ul
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    DevOps
                  </span>
                </div>
              </div>
              <div className="grid justify-end gap-6 lg:text-end">
                <div className="text-xs text-secondary-foreground uppercase">rating</div>
                <div className="rating">
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                </div>
              </div>
              <div className="grid justify-end gap-3.5 lg:text-end lg:min-w-24 shrink-0 max-w-auto">
                <span className="text-xs text-secondary-foreground uppercase">memebers</span>
                <div className="flex -space-x-2">
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-4.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-1.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-2.png"
                      />
                    </div>
                  </span>
                  <span className="flex items-center cursor-default justify-center relative shrink-0 rounded-full border-1 border-background hover:z-10 font-semibold text-[11px] leading-none size-7 text-white ring-background bg-green-500">
                    +10
                  </span>
                </div>
              </div>
              <div className="grid justify-end min-w-20">
                <button
                  data-slot="button"
                  className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 bg-background text-accent-foreground border border-input hover:bg-accent data-[state=open]:bg-accent h-8.5 rounded-md px-3 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60 shadow-xs shadow-black/5"
                >
                  <a
                    href="/metronic/tailwind/react/demo1/public-profile/teams"
                    data-discover="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check"
                      aria-hidden="true"
                    >
                      <circle cx={12} cy={12} r={10} />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </a>{' '}
                  Joined
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex flex-wrap justify-between items-center gap-7">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center size-14 shrink-0 rounded-full ring-1 ring-input bg-accent/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sparkles text-2xl text-secondary-foreground"
                  aria-hidden="true"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                  <path d="M20 3v4" />
                  <path d="M22 5h-4" />
                  <path d="M4 17v2" />
                  <path d="M5 18H3" />
                </svg>
              </div>
              <div className="grid grid-col gap-1">
                <a
                  className="text-base font-medium text-mono hover:text-primary-active mb-px"
                  href="/metronic/tailwind/react/demo1/public-profile/teams"
                  data-discover="true"
                >
                  Code Masters
                </a>
                <span className="text-sm text-secondary-foreground">
                  Coding the future, one line at a time
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 lg:gap-12">
              <div className="grid gap-5 justify-end lg:text-end">
                <span className="text-xs font-normal text-muted-foreground uppercase">skills</span>
                <div className="flex gap-1.5">
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Dev
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Al
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Cloud
                  </span>
                </div>
              </div>
              <div className="grid justify-end gap-6 lg:text-end">
                <div className="text-xs text-secondary-foreground uppercase">rating</div>
                <div className="rating">
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                </div>
              </div>
              <div className="grid justify-end gap-3.5 lg:text-end lg:min-w-24 shrink-0 max-w-auto">
                <span className="text-xs text-secondary-foreground uppercase">memebers</span>
                <div className="flex -space-x-2">
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-5.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-7.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-11.png"
                      />
                    </div>
                  </span>
                </div>
              </div>
              <div className="grid justify-end min-w-20">
                <button
                  data-slot="button"
                  className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 bg-background text-accent-foreground border border-input hover:bg-accent data-[state=open]:bg-accent h-8.5 rounded-md px-3 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60 shadow-xs shadow-black/5"
                >
                  <a
                    href="/metronic/tailwind/react/demo1/public-profile/teams"
                    data-discover="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check"
                      aria-hidden="true"
                    >
                      <circle cx={12} cy={12} r={10} />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </a>{' '}
                  Joined
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex flex-wrap justify-between items-center gap-7">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center size-14 shrink-0 rounded-full ring-1 ring-input bg-accent/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-brain text-2xl text-secondary-foreground"
                  aria-hidden="true"
                >
                  <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                  <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                  <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
                  <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
                  <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
                  <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
                  <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
                  <path d="M6 18a4 4 0 0 1-1.967-.516" />
                  <path d="M19.967 17.484A4 4 0 0 1 18 18" />
                </svg>
              </div>
              <div className="grid grid-col gap-1">
                <a
                  className="text-base font-medium text-mono hover:text-primary-active mb-px"
                  href="/metronic/tailwind/react/demo1/public-profile/teams"
                  data-discover="true"
                >
                  Market Mavericks
                </a>
                <span className="text-sm text-secondary-foreground">
                  Navigating markets with strategic solutions
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 lg:gap-12">
              <div className="grid gap-5 justify-end lg:text-end">
                <span className="text-xs font-normal text-muted-foreground uppercase">skills</span>
                <div className="flex gap-1.5">
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Marketing
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Brand
                  </span>
                </div>
              </div>
              <div className="grid justify-end gap-6 lg:text-end">
                <div className="text-xs text-secondary-foreground uppercase">rating</div>
                <div className="rating">
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label indeterminate">
                    <i
                      className="kt-rating-on ki-solid ki-star text-base leading-none"
                      style={{ width: '50%' }}
                    />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                </div>
              </div>
              <div className="grid justify-end gap-3.5 lg:text-end lg:min-w-24 shrink-0 max-w-auto">
                <span className="text-xs text-secondary-foreground uppercase">memebers</span>
                <div className="flex -space-x-2">
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-4.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-1.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-2.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <span
                      data-slot="avatar-fallback"
                      className="flex items-center justify-center rounded-full relative border-1 border-background hover:z-10 text-[11px] size-7 text-primary-foreground ring-background bg-primary"
                    >
                      S
                    </span>
                  </span>
                </div>
              </div>
              <div className="grid justify-end min-w-20">
                <button
                  data-slot="button"
                  className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 data-[state=open]:bg-primary/90 h-8.5 rounded-md px-3 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-xs shadow-black/5"
                >
                  <a
                    href="/metronic/tailwind/react/demo1/public-profile/teams"
                    data-discover="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-users"
                      aria-hidden="true"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <circle cx={9} cy={7} r={4} />
                    </svg>
                  </a>{' '}
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex flex-wrap justify-between items-center gap-7">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center size-14 shrink-0 rounded-full ring-1 ring-input bg-accent/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shield-off text-2xl text-secondary-foreground"
                  aria-hidden="true"
                >
                  <path d="m2 2 20 20" />
                  <path d="M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71" />
                  <path d="M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264" />
                </svg>
              </div>
              <div className="grid grid-col gap-1">
                <a
                  className="text-base font-medium text-mono hover:text-primary-active mb-px"
                  href="/metronic/tailwind/react/demo1/public-profile/teams"
                  data-discover="true"
                >
                  Data Dynamo
                </a>
                <span className="text-sm text-secondary-foreground">
                  Transforming data into actionable insights
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 lg:gap-12">
              <div className="grid gap-5 justify-end lg:text-end">
                <span className="text-xs font-normal text-muted-foreground uppercase">skills</span>
                <div className="flex gap-1.5">
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Analytics
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Data
                  </span>
                </div>
              </div>
              <div className="grid justify-end gap-6 lg:text-end">
                <div className="text-xs text-secondary-foreground uppercase">rating</div>
                <div className="rating">
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label indeterminate">
                    <i
                      className="kt-rating-on ki-solid ki-star text-base leading-none"
                      style={{ width: '50%' }}
                    />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                </div>
              </div>
              <div className="grid justify-end gap-3.5 lg:text-end lg:min-w-24 shrink-0 max-w-auto">
                <span className="text-xs text-secondary-foreground uppercase">memebers</span>
                <div className="flex -space-x-2 lg:justify-end">
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-23.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-31.png"
                      />
                    </div>
                  </span>
                </div>
              </div>
              <div className="grid justify-end min-w-20">
                <button
                  data-slot="button"
                  className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 bg-background text-accent-foreground border border-input hover:bg-accent data-[state=open]:bg-accent h-8.5 rounded-md px-3 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60 shadow-xs shadow-black/5"
                >
                  <a
                    href="/metronic/tailwind/react/demo1/public-profile/teams"
                    data-discover="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check"
                      aria-hidden="true"
                    >
                      <circle cx={12} cy={12} r={10} />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </a>{' '}
                  Joined
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex flex-wrap justify-between items-center gap-7">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center size-14 shrink-0 rounded-full ring-1 ring-input bg-accent/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chart-line text-2xl text-secondary-foreground"
                  aria-hidden="true"
                >
                  <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <div className="grid grid-col gap-1">
                <a
                  className="text-base font-medium text-mono hover:text-primary-active mb-px"
                  href="/metronic/tailwind/react/demo1/public-profile/teams"
                  data-discover="true"
                >
                  Market Mavericks
                </a>
                <span className="text-sm text-secondary-foreground">
                  Navigating markets with strategic solutions
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 lg:gap-12">
              <div className="grid gap-5 justify-end lg:text-end">
                <span className="text-xs font-normal text-muted-foreground uppercase">skills</span>
                <div className="flex gap-1.5">
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Marketing
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Brand
                  </span>
                </div>
              </div>
              <div className="grid justify-end gap-6 lg:text-end">
                <div className="text-xs text-secondary-foreground uppercase">rating</div>
                <div className="rating">
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                </div>
              </div>
              <div className="grid justify-end gap-3.5 lg:text-end lg:min-w-24 shrink-0 max-w-auto">
                <span className="text-xs text-secondary-foreground uppercase">memebers</span>
                <div className="flex -space-x-2">
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-4.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-1.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-14.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <span
                      data-slot="avatar-fallback"
                      className="flex items-center justify-center rounded-full relative border-1 border-background hover:z-10 text-[11px] size-7 text-primary-foreground ring-background bg-primary"
                    >
                      A
                    </span>
                  </span>
                </div>
              </div>
              <div className="grid justify-end min-w-20">
                <button
                  data-slot="button"
                  className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 data-[state=open]:bg-primary/90 h-8.5 rounded-md px-3 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-xs shadow-black/5"
                >
                  <a
                    href="/metronic/tailwind/react/demo1/public-profile/teams"
                    data-discover="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-users"
                      aria-hidden="true"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <circle cx={9} cy={7} r={4} />
                    </svg>
                  </a>{' '}
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex flex-wrap justify-between items-center gap-7">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center size-14 shrink-0 rounded-full ring-1 ring-input bg-accent/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-square-code text-2xl text-secondary-foreground"
                  aria-hidden="true"
                >
                  <path d="M10 7.5 8 10l2 2.5" />
                  <path d="m14 7.5 2 2.5-2 2.5" />
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="grid grid-col gap-1">
                <a
                  className="text-base font-medium text-mono hover:text-primary-active mb-px"
                  href="/metronic/tailwind/react/demo1/public-profile/teams"
                  data-discover="true"
                >
                  Code Masters
                </a>
                <span className="text-sm text-secondary-foreground">
                  Coding the future, one line at a time
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 lg:gap-12">
              <div className="grid gap-5 justify-end lg:text-end">
                <span className="text-xs font-normal text-muted-foreground uppercase">skills</span>
                <div className="flex gap-1.5">
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Dev
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Al
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Cloud
                  </span>
                </div>
              </div>
              <div className="grid justify-end gap-6 lg:text-end">
                <div className="text-xs text-secondary-foreground uppercase">rating</div>
                <div className="rating">
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                </div>
              </div>
              <div className="grid justify-end gap-3.5 lg:text-end lg:min-w-24 shrink-0 max-w-auto">
                <span className="text-xs text-secondary-foreground uppercase">memebers</span>
                <div className="flex -space-x-2">
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-5.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-6.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-7.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-11.png"
                      />
                    </div>
                  </span>
                </div>
              </div>
              <div className="grid justify-end min-w-20">
                <button
                  data-slot="button"
                  className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 bg-background text-accent-foreground border border-input hover:bg-accent data-[state=open]:bg-accent h-8.5 rounded-md px-3 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60 shadow-xs shadow-black/5"
                >
                  <a
                    href="/metronic/tailwind/react/demo1/public-profile/teams"
                    data-discover="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check"
                      aria-hidden="true"
                    >
                      <circle cx={12} cy={12} r={10} />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </a>{' '}
                  Joined
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex flex-wrap justify-between items-center gap-7">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center size-14 shrink-0 rounded-full ring-1 ring-input bg-accent/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-star text-2xl text-secondary-foreground"
                  aria-hidden="true"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
              </div>
              <div className="grid grid-col gap-1">
                <a
                  className="text-base font-medium text-mono hover:text-primary-active mb-px"
                  href="/metronic/tailwind/react/demo1/public-profile/teams"
                  data-discover="true"
                >
                  Fusion Thinkers
                </a>
                <span className="text-sm text-secondary-foreground">
                  Merging strategy for impactful results
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 lg:gap-12">
              <div className="grid gap-5 justify-end lg:text-end">
                <span className="text-xs font-normal text-muted-foreground uppercase">skills</span>
                <div className="flex gap-1.5">
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Creative
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Strat
                  </span>
                </div>
              </div>
              <div className="grid justify-end gap-6 lg:text-end">
                <div className="text-xs text-secondary-foreground uppercase">rating</div>
                <div className="rating">
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                </div>
              </div>
              <div className="grid justify-end gap-3.5 lg:text-end lg:min-w-24 shrink-0 max-w-auto">
                <span className="text-xs text-secondary-foreground uppercase">memebers</span>
                <div className="flex -space-x-2">
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-2.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-17.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-12.png"
                      />
                    </div>
                  </span>
                  <span className="flex items-center cursor-default justify-center relative shrink-0 rounded-full border-1 border-background hover:z-10 font-semibold text-[11px] leading-none text-white ring-background bg-green-500 size-7">
                    +23
                  </span>
                </div>
              </div>
              <div className="grid justify-end min-w-20">
                <button
                  data-slot="button"
                  className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 data-[state=open]:bg-primary/90 h-8.5 rounded-md px-3 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-xs shadow-black/5"
                >
                  <a
                    href="/metronic/tailwind/react/demo1/public-profile/teams"
                    data-discover="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-users"
                      aria-hidden="true"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <circle cx={9} cy={7} r={4} />
                    </svg>
                  </a>{' '}
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex flex-wrap justify-between items-center gap-7">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center size-14 shrink-0 rounded-full ring-1 ring-input bg-accent/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-users text-2xl text-secondary-foreground"
                  aria-hidden="true"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <circle cx={9} cy={7} r={4} />
                </svg>
              </div>
              <div className="grid grid-col gap-1">
                <a
                  className="text-base font-medium text-mono hover:text-primary-active mb-px"
                  href="/metronic/tailwind/react/demo1/public-profile/teams"
                  data-discover="true"
                >
                  {' '}
                  Spark Surge
                </a>
                <span className="text-sm text-secondary-foreground">
                  {' '}
                  Igniting ideas into powerful solutions
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 lg:gap-12">
              <div className="grid gap-5 justify-end lg:text-end">
                <span className="text-xs font-normal text-muted-foreground uppercase">skills</span>
                <div className="flex gap-1.5">
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Innovation
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Tech
                  </span>
                </div>
              </div>
              <div className="grid justify-end gap-6 lg:text-end">
                <div className="text-xs text-secondary-foreground uppercase">rating</div>
                <div className="rating">
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label indeterminate">
                    <i
                      className="kt-rating-on ki-solid ki-star text-base leading-none"
                      style={{ width: '50%' }}
                    />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                </div>
              </div>
              <div className="grid justify-end gap-3.5 lg:text-end lg:min-w-24 shrink-0 max-w-auto">
                <span className="text-xs text-secondary-foreground uppercase">memebers</span>
                <div className="flex -space-x-2">
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-14.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-3.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-19.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-9.png"
                      />
                    </div>
                  </span>
                </div>
              </div>
              <div className="grid justify-end min-w-20">
                <button
                  data-slot="button"
                  className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 bg-background text-accent-foreground border border-input hover:bg-accent data-[state=open]:bg-accent h-8.5 rounded-md px-3 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60 shadow-xs shadow-black/5"
                >
                  <a
                    href="/metronic/tailwind/react/demo1/public-profile/teams"
                    data-discover="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check"
                      aria-hidden="true"
                    >
                      <circle cx={12} cy={12} r={10} />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </a>{' '}
                  Joined
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex flex-wrap justify-between items-center gap-7">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center size-14 shrink-0 rounded-full ring-1 ring-input bg-accent/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-star text-2xl text-secondary-foreground"
                  aria-hidden="true"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
              </div>
              <div className="grid grid-col gap-1">
                <a
                  className="text-base font-medium text-mono hover:text-primary-active mb-px"
                  href="/metronic/tailwind/react/demo1/public-profile/teams"
                  data-discover="true"
                >
                  Quantum Craft
                </a>
                <span className="text-sm text-secondary-foreground">
                  Infusing concepts into cutting-edge tech
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 lg:gap-12">
              <div className="grid gap-5 justify-end lg:text-end">
                <span className="text-xs font-normal text-muted-foreground uppercase">skills</span>
                <div className="flex gap-1.5">
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Marketing
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-transparent border border-border text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Brand
                  </span>
                </div>
              </div>
              <div className="grid justify-end gap-6 lg:text-end">
                <div className="text-xs text-secondary-foreground uppercase">rating</div>
                <div className="rating">
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label checked">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                  <div className="kt-rating-label">
                    <i className="kt-rating-on ki-solid ki-star text-base leading-none" />
                    <i className="kt-rating-off ki-outline ki-star text-base leading-none" />
                  </div>
                </div>
              </div>
              <div className="grid justify-end gap-3.5 lg:text-end lg:min-w-24 shrink-0 max-w-auto">
                <span className="text-xs text-secondary-foreground uppercase">memebers</span>
                <div className="flex -space-x-2">
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-1.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                      <img
                        data-slot="avatar-image"
                        className="aspect-square h-full w-full"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/avatars/300-16.png"
                      />
                    </div>
                  </span>
                  <span data-slot="avatar" className="relative flex shrink-0 size-7">
                    <span
                      data-slot="avatar-fallback"
                      className="flex items-center justify-center rounded-full relative border-1 border-background hover:z-10 text-[11px] size-7 text-white ring-background bg-violet-500"
                    >
                      K
                    </span>
                  </span>
                </div>
              </div>
              <div className="grid justify-end min-w-20">
                <button
                  data-slot="button"
                  className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 data-[state=open]:bg-primary/90 h-8.5 rounded-md px-3 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-xs shadow-black/5"
                >
                  <a
                    href="/metronic/tailwind/react/demo1/public-profile/teams"
                    data-discover="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-users"
                      aria-hidden="true"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <circle cx={9} cy={7} r={4} />
                    </svg>
                  </a>{' '}
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex grow justify-center pt-5 lg:pt-7.5">
        <a
          data-slot="button"
          className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent font-medium text-primary hover:text-primary/90 [&_svg]:opacity-60 underline underline-offset-4 decoration-dashed decoration-1"
          href="/metronic/tailwind/react/demo1/account/members/teams"
          data-discover="true"
        >
          Show more Teams
        </a>
      </div>
    </div>
  );
};

const ProjectGrid: React.FunctionComponent = () => {
  return (
    <div id="projects_cards">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex items-center justify-between mb-3 lg:mb-6">
            <div className="flex items-center justify-center size-[50px] rounded-lg bg-accent/60">
              <img
                className=""
                alt="image"
                src="/metronic/tailwind/react/demo1/media/brand-logos/plurk.svg"
              />
            </div>
            <span
              data-slot="badge"
              className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 rounded-md px-[0.5rem] h-7 min-w-7 gap-1.5 text-xs [&_svg]:size-3.5 text-[var(--color-primary-accent,var(--color-blue-700))] bg-[var(--color-primary-soft,var(--color-blue-50))] dark:bg-[var(--color-primary-soft,var(--color-blue-950))] dark:text-[var(--color-primary-soft,var(--color-blue-600))]"
            >
              In Progress
            </span>
          </div>
          <div className="flex flex-col mb-3 lg:mb-6">
            <a
              className="text-lg font-media/brand text-mono hover:text-primary-active mb-px"
              href="/metronic/tailwind/react/demo1/public-profile/projects/3-columns"
              data-discover="true"
            >
              Phoenix SaaS
            </a>
            <span className="text-sm text-secondary-foreground">Real-time photo sharing app</span>
          </div>
          <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
            <span className="text-sm text-secondary-foreground">
              Start: <span className="text-sm font-medium text-foreground">Mar 06</span>
            </span>
            <span className="text-sm text-secondary-foreground">
              End: <span className="text-sm font-medium text-foreground">Dec 21</span>
            </span>
          </div>
          <div
            aria-valuemax={100}
            aria-valuemin={0}
            role="progressbar"
            data-state="indeterminate"
            data-max={100}
            data-slot="progress"
            className="relative w-full overflow-hidden rounded-full bg-secondary h-1.5 mb-4 lg:mb-8"
          >
            <div
              data-state="indeterminate"
              data-max={100}
              data-slot="progress-indicator"
              className="h-full w-full flex-1 transition-all bg-primary"
              style={{ transform: 'translateX(-45%)' }}
            />
          </div>
          <div className="flex -space-x-2">
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-4.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-2.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <span
                data-slot="avatar-fallback"
                className="flex items-center justify-center rounded-full relative border-1 border-background hover:z-10 text-[11px] size-[30px] text-primary-foreground ring-background bg-primary"
              >
                S
              </span>
            </span>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex items-center justify-between mb-3 lg:mb-6">
            <div className="flex items-center justify-center size-[50px] rounded-lg bg-accent/60">
              <img
                className=""
                alt="image"
                src="/metronic/tailwind/react/demo1/media/brand-logos/telegram.svg"
              />
            </div>
            <span
              data-slot="badge"
              className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 rounded-md px-[0.5rem] h-7 min-w-7 gap-1.5 text-xs [&_svg]:size-3.5 text-[var(--color-success-accent,var(--color-green-800))] bg-[var(--color-success-soft,var(--color-green-100))] dark:bg-[var(--color-success-soft,var(--color-green-950))] dark:text-[var(--color-success-soft,var(--color-green-600))]"
            >
              Completed
            </span>
          </div>
          <div className="flex flex-col mb-3 lg:mb-6">
            <a
              className="text-lg font-media/brand text-mono hover:text-primary-active mb-px"
              href="/metronic/tailwind/react/demo1/public-profile/projects/3-columns"
              data-discover="true"
            >
              Radiant Wave
            </a>
            <span className="text-sm text-secondary-foreground">
              Short-term accommodation marketplace
            </span>
          </div>
          <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
            <span className="text-sm text-secondary-foreground">
              Start: <span className="text-sm font-medium text-foreground">Mar 09</span>
            </span>
            <span className="text-sm text-secondary-foreground">
              End: <span className="text-sm font-medium text-foreground">Dec 23</span>
            </span>
          </div>
          <div
            aria-valuemax={100}
            aria-valuemin={0}
            role="progressbar"
            data-state="indeterminate"
            data-max={100}
            data-slot="progress"
            className="relative w-full overflow-hidden rounded-full bg-secondary h-1.5 mb-4 lg:mb-8"
          >
            <div
              data-state="indeterminate"
              data-max={100}
              data-slot="progress-indicator"
              className="h-full w-full flex-1 transition-all bg-green-500"
              style={{ transform: 'translateX(0%)' }}
            />
          </div>
          <div className="flex -space-x-2">
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-24.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-7.png"
                />
              </div>
            </span>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex items-center justify-between mb-3 lg:mb-6">
            <div className="flex items-center justify-center size-[50px] rounded-lg bg-accent/60">
              <img
                className=""
                alt="image"
                src="/metronic/tailwind/react/demo1/media/brand-logos/kickstarter.svg"
              />
            </div>
            <span
              data-slot="badge"
              className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 rounded-md px-[0.5rem] h-7 min-w-7 gap-1.5 text-xs [&_svg]:size-3.5 bg-secondary dark:bg-secondary/50 text-secondary-foreground"
            >
              Upcoming
            </span>
          </div>
          <div className="flex flex-col mb-3 lg:mb-6">
            <a
              className="text-lg font-media/brand text-mono hover:text-primary-active mb-px"
              href="/metronic/tailwind/react/demo1/public-profile/projects/3-columns"
              data-discover="true"
            >
              Dreamweaver
            </a>
            <span className="text-sm text-secondary-foreground">Social media photo sharing</span>
          </div>
          <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
            <span className="text-sm text-secondary-foreground">
              Start: <span className="text-sm font-medium text-foreground">Mar 05</span>
            </span>
            <span className="text-sm text-secondary-foreground">
              End: <span className="text-sm font-medium text-foreground">Dec 12</span>
            </span>
          </div>
          <div
            aria-valuemax={100}
            aria-valuemin={0}
            role="progressbar"
            data-state="indeterminate"
            data-max={100}
            data-slot="progress"
            className="relative w-full overflow-hidden rounded-full bg-secondary h-1.5 mb-4 lg:mb-8"
          >
            <div
              data-state="indeterminate"
              data-max={100}
              data-slot="progress-indicator"
              className="h-full w-full flex-1 transition-all bg-input"
              style={{ transform: 'translateX(0%)' }}
            />
          </div>
          <div className="flex -space-x-2">
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-21.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-1.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-2.png"
                />
              </div>
            </span>
            <span className="flex items-center cursor-default justify-center relative shrink-0 rounded-full border-1 border-background hover:z-10 font-semibold text-[11px] leading-none size-[30px] text-white ring-background bg-green-500">
              +10
            </span>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex items-center justify-between mb-3 lg:mb-6">
            <div className="flex items-center justify-center size-[50px] rounded-lg bg-accent/60">
              <img
                className=""
                alt="image"
                src="/metronic/tailwind/react/demo1/media/brand-logos/quickbooks.svg"
              />
            </div>
            <span
              data-slot="badge"
              className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 rounded-md px-[0.5rem] h-7 min-w-7 gap-1.5 text-xs [&_svg]:size-3.5 text-[var(--color-primary-accent,var(--color-blue-700))] bg-[var(--color-primary-soft,var(--color-blue-50))] dark:bg-[var(--color-primary-soft,var(--color-blue-950))] dark:text-[var(--color-primary-soft,var(--color-blue-600))]"
            >
              In Progress
            </span>
          </div>
          <div className="flex flex-col mb-3 lg:mb-6">
            <a
              className="text-lg font-media/brand text-mono hover:text-primary-active mb-px"
              href="/metronic/tailwind/react/demo1/public-profile/projects/3-columns"
              data-discover="true"
            >
              Horizon Quest
            </a>
            <span className="text-sm text-secondary-foreground">
              Team communication and collaboration
            </span>
          </div>
          <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
            <span className="text-sm text-secondary-foreground">
              Start: <span className="text-sm font-medium text-foreground">Mar 03</span>
            </span>
            <span className="text-sm text-secondary-foreground">
              End: <span className="text-sm font-medium text-foreground">Dec 11</span>
            </span>
          </div>
          <div
            aria-valuemax={100}
            aria-valuemin={0}
            role="progressbar"
            data-state="indeterminate"
            data-max={100}
            data-slot="progress"
            className="relative w-full overflow-hidden rounded-full bg-secondary h-1.5 mb-4 lg:mb-8"
          >
            <div
              data-state="indeterminate"
              data-max={100}
              data-slot="progress-indicator"
              className="h-full w-full flex-1 transition-all bg-primary"
              style={{ transform: 'translateX(-81%)' }}
            />
          </div>
          <div className="flex -space-x-2">
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-1.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-2.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <span
                data-slot="avatar-fallback"
                className="flex items-center justify-center rounded-full relative border-1 border-background hover:z-10 text-[11px] size-[30px] text-destructive-foreground ring-background bg-destructive"
              >
                M
              </span>
            </span>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex items-center justify-between mb-3 lg:mb-6">
            <div className="flex items-center justify-center size-[50px] rounded-lg bg-accent/60">
              <img
                className=""
                alt="image"
                src="/metronic/tailwind/react/demo1/media/brand-logos/google-analytics.svg"
              />
            </div>
            <span
              data-slot="badge"
              className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 rounded-md px-[0.5rem] h-7 min-w-7 gap-1.5 text-xs [&_svg]:size-3.5 bg-secondary dark:bg-secondary/50 text-secondary-foreground"
            >
              Upcoming
            </span>
          </div>
          <div className="flex flex-col mb-3 lg:mb-6">
            <a
              className="text-lg font-media/brand text-mono hover:text-primary-active mb-px"
              href="/metronic/tailwind/react/demo1/public-profile/projects/3-columns"
              data-discover="true"
            >
              Golden Gate Analytics
            </a>
            <span className="text-sm text-secondary-foreground">
              Note-taking and organization app
            </span>
          </div>
          <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
            <span className="text-sm text-secondary-foreground">
              Start: <span className="text-sm font-medium text-foreground">Mar 22</span>
            </span>
            <span className="text-sm text-secondary-foreground">
              End: <span className="text-sm font-medium text-foreground">Dec 14</span>
            </span>
          </div>
          <div
            aria-valuemax={100}
            aria-valuemin={0}
            role="progressbar"
            data-state="indeterminate"
            data-max={100}
            data-slot="progress"
            className="relative w-full overflow-hidden rounded-full bg-secondary h-1.5 mb-4 lg:mb-8"
          >
            <div
              data-state="indeterminate"
              data-max={100}
              data-slot="progress-indicator"
              className="h-full w-full flex-1 transition-all bg-input"
              style={{ transform: 'translateX(0%)' }}
            />
          </div>
          <div className="flex -space-x-2">
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-5.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-17.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-16.png"
                />
              </div>
            </span>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex items-center justify-between mb-3 lg:mb-6">
            <div className="flex items-center justify-center size-[50px] rounded-lg bg-accent/60">
              <img
                className=""
                alt="image"
                src="/metronic/tailwind/react/demo1/media/brand-logos/google-webdev.svg"
              />
            </div>
            <span
              data-slot="badge"
              className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 rounded-md px-[0.5rem] h-7 min-w-7 gap-1.5 text-xs [&_svg]:size-3.5 text-[var(--color-success-accent,var(--color-green-800))] bg-[var(--color-success-soft,var(--color-green-100))] dark:bg-[var(--color-success-soft,var(--color-green-950))] dark:text-[var(--color-success-soft,var(--color-green-600))]"
            >
              Completed
            </span>
          </div>
          <div className="flex flex-col mb-3 lg:mb-6">
            <a
              className="text-lg font-media/brand text-mono hover:text-primary-active mb-px"
              href="/metronic/tailwind/react/demo1/public-profile/projects/3-columns"
              data-discover="true"
            >
              Celestial SaaS
            </a>
            <span className="text-sm text-secondary-foreground">
              CRM App application to HR efficienty
            </span>
          </div>
          <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
            <span className="text-sm text-secondary-foreground">
              Start: <span className="text-sm font-medium text-foreground">Mar 14</span>
            </span>
            <span className="text-sm text-secondary-foreground">
              End: <span className="text-sm font-medium text-foreground">Dec 25</span>
            </span>
          </div>
          <div
            aria-valuemax={100}
            aria-valuemin={0}
            role="progressbar"
            data-state="indeterminate"
            data-max={100}
            data-slot="progress"
            className="relative w-full overflow-hidden rounded-full bg-secondary h-1.5 mb-4 lg:mb-8"
          >
            <div
              data-state="indeterminate"
              data-max={100}
              data-slot="progress-indicator"
              className="h-full w-full flex-1 transition-all bg-green-500"
              style={{ transform: 'translateX(0%)' }}
            />
          </div>
          <div className="flex -space-x-2">
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-6.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-23.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-12.png"
                />
              </div>
            </span>
            <span className="flex items-center cursor-default justify-center relative shrink-0 rounded-full border-1 border-background hover:z-10 font-semibold text-[11px] leading-none size-[30px] text-primary-foreground ring-background bg-primary">
              +10
            </span>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex items-center justify-between mb-3 lg:mb-6">
            <div className="flex items-center justify-center size-[50px] rounded-lg bg-accent/60">
              <img
                className=""
                alt="image"
                src="/metronic/tailwind/react/demo1/media/brand-logos/figma.svg"
              />
            </div>
            <span
              data-slot="badge"
              className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 rounded-md px-[0.5rem] h-7 min-w-7 gap-1.5 text-xs [&_svg]:size-3.5 bg-secondary dark:bg-secondary/50 text-secondary-foreground"
            >
              Upcoming
            </span>
          </div>
          <div className="flex flex-col mb-3 lg:mb-6">
            <a
              className="text-lg font-media/brand text-mono hover:text-primary-active mb-px"
              href="/metronic/tailwind/react/demo1/public-profile/projects/3-columns"
              data-discover="true"
            >
              Nexus Design System
            </a>
            <span className="text-sm text-secondary-foreground">
              Online discussion and forum platform
            </span>
          </div>
          <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
            <span className="text-sm text-secondary-foreground">
              Start: <span className="text-sm font-medium text-foreground">Mar 17</span>
            </span>
            <span className="text-sm text-secondary-foreground">
              End: <span className="text-sm font-medium text-foreground">Dec 08</span>
            </span>
          </div>
          <div
            aria-valuemax={100}
            aria-valuemin={0}
            role="progressbar"
            data-state="indeterminate"
            data-max={100}
            data-slot="progress"
            className="relative w-full overflow-hidden rounded-full bg-secondary h-1.5 mb-4 lg:mb-8"
          >
            <div
              data-state="indeterminate"
              data-max={100}
              data-slot="progress-indicator"
              className="h-full w-full flex-1 transition-all bg-input"
              style={{ transform: 'translateX(0%)' }}
            />
          </div>
          <div className="flex -space-x-2">
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-14.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-3.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-19.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-9.png"
                />
              </div>
            </span>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex items-center justify-between mb-3 lg:mb-6">
            <div className="flex items-center justify-center size-[50px] rounded-lg bg-accent/60">
              <img
                className=""
                alt="image"
                src="/metronic/tailwind/react/demo1/media/brand-logos/btcchina.svg"
              />
            </div>
            <span
              data-slot="badge"
              className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 rounded-md px-[0.5rem] h-7 min-w-7 gap-1.5 text-xs [&_svg]:size-3.5 text-[var(--color-primary-accent,var(--color-blue-700))] bg-[var(--color-primary-soft,var(--color-blue-50))] dark:bg-[var(--color-primary-soft,var(--color-blue-950))] dark:text-[var(--color-primary-soft,var(--color-blue-600))]"
            >
              In Progress
            </span>
          </div>
          <div className="flex flex-col mb-3 lg:mb-6">
            <a
              className="text-lg font-media/brand text-mono hover:text-primary-active mb-px"
              href="/metronic/tailwind/react/demo1/public-profile/projects/3-columns"
              data-discover="true"
            >
              Neptune App
            </a>
            <span className="text-sm text-secondary-foreground">
              Team messaging and collaboration
            </span>
          </div>
          <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
            <span className="text-sm text-secondary-foreground">
              Start: <span className="text-sm font-medium text-foreground">Mar 09</span>
            </span>
            <span className="text-sm text-secondary-foreground">
              End: <span className="text-sm font-medium text-foreground">Dec 23</span>
            </span>
          </div>
          <div
            aria-valuemax={100}
            aria-valuemin={0}
            role="progressbar"
            data-state="indeterminate"
            data-max={100}
            data-slot="progress"
            className="relative w-full overflow-hidden rounded-full bg-secondary h-1.5 mb-4 lg:mb-8"
          >
            <div
              data-state="indeterminate"
              data-max={100}
              data-slot="progress-indicator"
              className="h-full w-full flex-1 transition-all bg-primary"
              style={{ transform: 'translateX(-65%)' }}
            />
          </div>
          <div className="flex -space-x-2">
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-21.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-32.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-2.png"
                />
              </div>
            </span>
            <span className="flex items-center cursor-default justify-center relative shrink-0 rounded-full border-1 border-background hover:z-10 font-semibold text-[11px] leading-none size-[30px] text-white ring-background bg-green-500">
              +1
            </span>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex items-center justify-between mb-3 lg:mb-6">
            <div className="flex items-center justify-center size-[50px] rounded-lg bg-accent/60">
              <img
                className=""
                alt="image"
                src="/metronic/tailwind/react/demo1/media/brand-logos/patientory.svg"
              />
            </div>
            <span
              data-slot="badge"
              className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 rounded-md px-[0.5rem] h-7 min-w-7 gap-1.5 text-xs [&_svg]:size-3.5 bg-secondary dark:bg-secondary/50 text-secondary-foreground"
            >
              Upcoming
            </span>
          </div>
          <div className="flex flex-col mb-3 lg:mb-6">
            <a
              className="text-lg font-media/brand text-mono hover:text-primary-active mb-px"
              href="/metronic/tailwind/react/demo1/public-profile/projects/3-columns"
              data-discover="true"
            >
              SparkleTech
            </a>
            <span className="text-sm text-secondary-foreground">Meditation and relaxation app</span>
          </div>
          <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
            <span className="text-sm text-secondary-foreground">
              Start: <span className="text-sm font-medium text-foreground">Mar 14</span>
            </span>
            <span className="text-sm text-secondary-foreground">
              End: <span className="text-sm font-medium text-foreground">Dec 21</span>
            </span>
          </div>
          <div
            aria-valuemax={100}
            aria-valuemin={0}
            role="progressbar"
            data-state="indeterminate"
            data-max={100}
            data-slot="progress"
            className="relative w-full overflow-hidden rounded-full bg-secondary h-1.5 mb-4 lg:mb-8"
          >
            <div
              data-state="indeterminate"
              data-max={100}
              data-slot="progress-indicator"
              className="h-full w-full flex-1 transition-all bg-input"
              style={{ transform: 'translateX(0%)' }}
            />
          </div>
          <div className="flex -space-x-2">
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-4.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-2.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <span
                data-slot="avatar-fallback"
                className="flex items-center justify-center rounded-full relative border-1 border-background hover:z-10 text-[11px] size-[30px] text-white ring-background bg-green-500"
              >
                K
              </span>
            </span>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex items-center justify-between mb-3 lg:mb-6">
            <div className="flex items-center justify-center size-[50px] rounded-lg bg-accent/60">
              <img
                className=""
                alt="image"
                src="/metronic/tailwind/react/demo1/media/brand-logos/jira.svg"
              />
            </div>
            <span
              data-slot="badge"
              className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 rounded-md px-[0.5rem] h-7 min-w-7 gap-1.5 text-xs [&_svg]:size-3.5 text-[var(--color-success-accent,var(--color-green-800))] bg-[var(--color-success-soft,var(--color-green-100))] dark:bg-[var(--color-success-soft,var(--color-green-950))] dark:text-[var(--color-success-soft,var(--color-green-600))]"
            >
              Completed
            </span>
          </div>
          <div className="flex flex-col mb-3 lg:mb-6">
            <a
              className="text-lg font-media/brand text-mono hover:text-primary-active mb-px"
              href="/metronic/tailwind/react/demo1/public-profile/projects/3-columns"
              data-discover="true"
            >
              EmberX CRM
            </a>
            <span className="text-sm text-secondary-foreground">Commission-free stock trading</span>
          </div>
          <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
            <span className="text-sm text-secondary-foreground">
              Start: <span className="text-sm font-medium text-foreground">Mar 01</span>
            </span>
            <span className="text-sm text-secondary-foreground">
              End: <span className="text-sm font-medium text-foreground">Dec 13</span>
            </span>
          </div>
          <div
            aria-valuemax={100}
            aria-valuemin={0}
            role="progressbar"
            data-state="indeterminate"
            data-max={100}
            data-slot="progress"
            className="relative w-full overflow-hidden rounded-full bg-secondary h-1.5 mb-4 lg:mb-8"
          >
            <div
              data-state="indeterminate"
              data-max={100}
              data-slot="progress-indicator"
              className="h-full w-full flex-1 transition-all bg-green-500"
              style={{ transform: 'translateX(0%)' }}
            />
          </div>
          <div className="flex -space-x-2">
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-12.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-20.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-3.png"
                />
              </div>
            </span>
            <span className="flex items-center cursor-default justify-center relative shrink-0 rounded-full border-1 border-background hover:z-10 font-semibold text-[11px] leading-none size-[30px] text-white ring-background bg-green-500">
              +5
            </span>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex items-center justify-between mb-3 lg:mb-6">
            <div className="flex items-center justify-center size-[50px] rounded-lg bg-accent/60">
              <img
                className=""
                alt="image"
                src="/metronic/tailwind/react/demo1/media/brand-logos/plastic-scm.svg"
              />
            </div>
            <span
              data-slot="badge"
              className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 rounded-md px-[0.5rem] h-7 min-w-7 gap-1.5 text-xs [&_svg]:size-3.5 bg-secondary dark:bg-secondary/50 text-secondary-foreground"
            >
              Upcoming
            </span>
          </div>
          <div className="flex flex-col mb-3 lg:mb-6">
            <a
              className="text-lg font-media/brand text-mono hover:text-primary-active mb-px"
              href="/metronic/tailwind/react/demo1/public-profile/projects/3-columns"
              data-discover="true"
            >
              LunaLink
            </a>
            <span className="text-sm text-secondary-foreground">Meditation and relaxation app</span>
          </div>
          <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
            <span className="text-sm text-secondary-foreground">
              Start: <span className="text-sm font-medium text-foreground">Mar 14</span>
            </span>
            <span className="text-sm text-secondary-foreground">
              End: <span className="text-sm font-medium text-foreground">Dec 21</span>
            </span>
          </div>
          <div
            aria-valuemax={100}
            aria-valuemin={0}
            role="progressbar"
            data-state="indeterminate"
            data-max={100}
            data-slot="progress"
            className="relative w-full overflow-hidden rounded-full bg-secondary h-1.5 mb-4 lg:mb-8"
          >
            <div
              data-state="indeterminate"
              data-max={100}
              data-slot="progress-indicator"
              className="h-full w-full flex-1 transition-all bg-input"
              style={{ transform: 'translateX(0%)' }}
            />
          </div>
          <div className="flex -space-x-2">
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-16.png"
                />
              </div>
            </span>
          </div>
        </div>
        <div
          data-slot="card"
          className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 p-7.5"
        >
          <div className="flex items-center justify-between mb-3 lg:mb-6">
            <div className="flex items-center justify-center size-[50px] rounded-lg bg-accent/60">
              <img
                className=""
                alt="image"
                src="/metronic/tailwind/react/demo1/media/brand-logos/perrier.svg"
              />
            </div>
            <span
              data-slot="badge"
              className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 rounded-md px-[0.5rem] h-7 min-w-7 gap-1.5 text-xs [&_svg]:size-3.5 text-[var(--color-primary-accent,var(--color-blue-700))] bg-[var(--color-primary-soft,var(--color-blue-50))] dark:bg-[var(--color-primary-soft,var(--color-blue-950))] dark:text-[var(--color-primary-soft,var(--color-blue-600))]"
            >
              In Progress
            </span>
          </div>
          <div className="flex flex-col mb-3 lg:mb-6">
            <a
              className="text-lg font-media/brand text-mono hover:text-primary-active mb-px"
              href="/metronic/tailwind/react/demo1/public-profile/projects/3-columns"
              data-discover="true"
            >
              TerraCrest App
            </a>
            <span className="text-sm text-secondary-foreground">Video conferencing software</span>
          </div>
          <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
            <span className="text-sm text-secondary-foreground">
              Start: <span className="text-sm font-medium text-foreground">Mar 22</span>
            </span>
            <span className="text-sm text-secondary-foreground">
              End: <span className="text-sm font-medium text-foreground">Dec 28</span>
            </span>
          </div>
          <div
            aria-valuemax={100}
            aria-valuemin={0}
            role="progressbar"
            data-state="indeterminate"
            data-max={100}
            data-slot="progress"
            className="relative w-full overflow-hidden rounded-full bg-secondary h-1.5 mb-4 lg:mb-8"
          >
            <div
              data-state="indeterminate"
              data-max={100}
              data-slot="progress-indicator"
              className="h-full w-full flex-1 transition-all bg-primary"
              style={{ transform: 'translateX(-45%)' }}
            />
          </div>
          <div className="flex -space-x-2">
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-4.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                <img
                  data-slot="avatar-image"
                  className="aspect-square h-full w-full"
                  alt="image"
                  src="/metronic/tailwind/react/demo1/media/avatars/300-9.png"
                />
              </div>
            </span>
            <span data-slot="avatar" className="relative flex shrink-0 size-[30px]">
              <span
                data-slot="avatar-fallback"
                className="flex items-center justify-center rounded-full relative border-1 border-background hover:z-10 text-[11px] size-[30px] text-primary-foreground ring-background bg-primary"
              >
                F
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex grow justify-center pt-5 lg:pt-7.5">
        <a
          data-slot="button"
          className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent font-medium text-primary hover:text-primary/90 [&_svg]:opacity-60 underline underline-offset-4 decoration-dashed decoration-1"
          href="/metronic/tailwind/react/demo1/public-profile/projects/3-columns"
          data-discover="true"
        >
          Show more projects
        </a>
      </div>
    </div>
  );
};

const ProjectComponent: React.FunctionComponent = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
      <div className="flex flex-wrap items-center gap-5 justify-between">
        <h3 className="text-lg text-mono font-semibold">12 Projects</h3>
        <div
          role="group"
          dir="ltr"
          data-slot="toggle-group"
          data-variant="outline"
          className="group/toggle-group flex items-center rounded-md gap-1 data-[variant=outline]:gap-0 data-[variant=outline]:shadow-xs"
          tabIndex={0}
          style={{ outline: 'none' }}
        >
          <button
            type="button"
            data-state="on"
            role="radio"
            aria-checked="true"
            data-slot="toggle-group-item"
            data-variant="outline"
            className="cursor-pointer inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-8.5 min-w-8.5 rounded-md px-2 text-[0.8125rem] leading-(--text-sm--line-height) gap-1 [&_svg]:size-4 shrink-0 shadow-none data-[variant=outline]:rounded-none data-[variant=outline]:first:rounded-s-md data-[variant=outline]:last:rounded-e-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-s-0 data-[variant=outline]:first:border-s"
            tabIndex={-1}
            data-radix-collection-item=""
            onClick={() => setView('grid')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-layout-grid"
              aria-hidden="true"
            >
              <rect width={7} height={7} x={3} y={3} rx={1} />
              <rect width={7} height={7} x={14} y={3} rx={1} />
              <rect width={7} height={7} x={14} y={14} rx={1} />
              <rect width={7} height={7} x={3} y={14} rx={1} />
            </svg>
          </button>
          <button
            type="button"
            data-state="off"
            role="radio"
            aria-checked="false"
            data-slot="toggle-group-item"
            data-variant="outline"
            className="cursor-pointer inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-8.5 min-w-8.5 rounded-md px-2 text-[0.8125rem] leading-(--text-sm--line-height) gap-1 [&_svg]:size-4 shrink-0 shadow-none data-[variant=outline]:rounded-none data-[variant=outline]:first:rounded-s-md data-[variant=outline]:last:rounded-e-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-s-0 data-[variant=outline]:first:border-s"
            tabIndex={-1}
            data-radix-collection-item=""
            onClick={() => setView('list')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-list"
              aria-hidden="true"
            >
              <path d="M3 12h.01" />
              <path d="M3 18h.01" />
              <path d="M3 6h.01" />
              <path d="M8 12h13" />
              <path d="M8 18h13" />
              <path d="M8 6h13" />
            </svg>
          </button>
        </div>
      </div>

      {view === 'grid' ? <ProjectGrid /> : <ProjectList />}
    </div>
  );
};

export default ProjectComponent;
