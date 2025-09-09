const ProfileTab: React.FunctionComponent = () => {
  return (
    <div data-slot="container" className="w-full mx-auto max-w-[1320px]">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
        <div className="col-span-1">
          <div className="grid gap-5 lg:gap-7.5">
            <div
              data-slot="card"
              className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5"
            >
              <div
                data-slot="card-header"
                className="flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5 border-b border-border"
              >
                <h3
                  data-slot="card-title"
                  className="text-base font-semibold leading-none tracking-tight"
                >
                  Community Badges
                </h3>
              </div>
              <div data-slot="card-content" className="grow p-5 pb-7.5">
                <div className="flex items-center flex-wrap gap-3 lg:gap-4">
                  <div className="relative size-[50px] shrink-0">
                    <svg
                      className="w-full h-full stroke-blue-200 dark:stroke-blue-950 fill-blue-50 dark:fill-blue-950/30"
                      width={44}
                      height={48}
                      viewBox="0 0 44 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
      18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
      39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z"
                        fill=""
                      />
                      <path
                        d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
      18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
      39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z"
                        stroke=""
                      />
                    </svg>
                    <div className="absolute leading-none start-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 rtl:translate-x-2/4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-volleyball text-xl ps-px text-blue-500"
                        aria-hidden="true"
                      >
                        <path d="M11.1 7.1a16.55 16.55 0 0 1 10.9 4" />
                        <path d="M12 12a12.6 12.6 0 0 1-8.7 5" />
                        <path d="M16.8 13.6a16.55 16.55 0 0 1-9 7.5" />
                        <path d="M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10" />
                        <path d="M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5" />
                        <circle cx={12} cy={12} r={10} />
                      </svg>
                    </div>
                  </div>
                  <div className="relative size-[50px] shrink-0">
                    <svg
                      className="w-full h-full stroke-orange-200 dark:stroke-orange-950 fill-orange-50 dark:fill-orange-950/30"
                      width={44}
                      height={48}
                      viewBox="0 0 44 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
      18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
      39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z"
                        fill=""
                      />
                      <path
                        d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
      18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
      39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z"
                        stroke=""
                      />
                    </svg>
                    <div className="absolute leading-none start-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 rtl:translate-x-2/4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-zap text-xl ps-px text-orange-500"
                        aria-hidden="true"
                      >
                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                      </svg>
                    </div>
                  </div>
                  <div className="relative size-[50px] shrink-0">
                    <svg
                      className="w-full h-full stroke-green-200 dark:stroke-green-950 fill-green-50 dark:fill-green-950/30"
                      width={44}
                      height={48}
                      viewBox="0 0 44 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
      18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
      39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z"
                        fill=""
                      />
                      <path
                        d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
      18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
      39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z"
                        stroke=""
                      />
                    </svg>
                    <div className="absolute leading-none start-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 rtl:translate-x-2/4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-messages-square text-xl ps-px text-green-500"
                        aria-hidden="true"
                      >
                        <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
                        <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                      </svg>
                    </div>
                  </div>
                  <div className="relative size-[50px] shrink-0">
                    <svg
                      className="w-full h-full stroke-violet-200 dark:stroke-violet-950 fill-violet-50  dark:fill-violet-950/30"
                      width={44}
                      height={48}
                      viewBox="0 0 44 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
      18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
      39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z"
                        fill=""
                      />
                      <path
                        d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
      18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
      39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z"
                        stroke=""
                      />
                    </svg>
                    <div className="absolute leading-none start-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 rtl:translate-x-2/4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-truck text-xl ps-px text-violet-500"
                        aria-hidden="true"
                      >
                        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                        <path d="M15 18H9" />
                        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                        <circle cx={17} cy={18} r={2} />
                        <circle cx={7} cy={18} r={2} />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-slot="card"
              className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5"
            >
              <div
                data-slot="card-header"
                className="flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5 border-b border-border ps-8"
              >
                <h3
                  data-slot="card-title"
                  className="text-base font-semibold leading-none tracking-tight"
                >
                  About
                </h3>
              </div>
              <div data-slot="card-content" className="grow p-5">
                <div data-slot="table-wrapper" className="relative w-full overflow-auto">
                  <table
                    data-slot="table"
                    className="w-full caption-bottom text-foreground text-sm"
                  >
                    <tbody data-slot="table-body" className="[&_tr:last-child]:border-0">
                      <tr
                        data-slot="table-row"
                        className="transition-colors [&:has(td):hover]:bg-muted/50 data-[state=selected]:bg-muted border-0"
                      >
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-sm text-secondary-foreground py-2"
                        >
                          Age:
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-sm text-mono py-2"
                        >
                          32
                        </td>
                      </tr>
                      <tr
                        data-slot="table-row"
                        className="transition-colors [&:has(td):hover]:bg-muted/50 data-[state=selected]:bg-muted border-0"
                      >
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-sm text-secondary-foreground py-2"
                        >
                          City:
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-sm text-mono py-2"
                        >
                          Amsterdam
                        </td>
                      </tr>
                      <tr
                        data-slot="table-row"
                        className="transition-colors [&:has(td):hover]:bg-muted/50 data-[state=selected]:bg-muted border-0"
                      >
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-sm text-secondary-foreground py-2"
                        >
                          State:
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-sm text-mono py-2"
                        >
                          North Holland
                        </td>
                      </tr>
                      <tr
                        data-slot="table-row"
                        className="transition-colors [&:has(td):hover]:bg-muted/50 data-[state=selected]:bg-muted border-0"
                      >
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-sm text-secondary-foreground py-2"
                        >
                          Country:
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-sm text-mono py-2"
                        >
                          Netherlands
                        </td>
                      </tr>
                      <tr
                        data-slot="table-row"
                        className="transition-colors [&:has(td):hover]:bg-muted/50 data-[state=selected]:bg-muted border-0"
                      >
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-sm text-secondary-foreground py-2"
                        >
                          Postcode:
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-sm text-mono py-2"
                        >
                          1092 NL
                        </td>
                      </tr>
                      <tr
                        data-slot="table-row"
                        className="transition-colors [&:has(td):hover]:bg-muted/50 data-[state=selected]:bg-muted border-0"
                      >
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-sm text-secondary-foreground py-2"
                        >
                          Phone:
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-sm text-mono py-2"
                        >
                          +31 6 1234 56 78
                        </td>
                      </tr>
                      <tr
                        data-slot="table-row"
                        className="transition-colors [&:has(td):hover]:bg-muted/50 data-[state=selected]:bg-muted border-0"
                      >
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-sm text-secondary-foreground py-2"
                        >
                          Email:
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-sm text-mono py-2"
                        >
                          <a
                            className="text-foreground hover:text-primary-active"
                            href="/metronic/tailwind/react/demo1/public-profile/profiles/default"
                            data-discover="true"
                          >
                            jenny@ktstudio.com
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              data-slot="card"
              className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5"
            >
              <div
                data-slot="card-header"
                className="flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5 border-b border-border"
              >
                <h3
                  data-slot="card-title"
                  className="text-base font-semibold leading-none tracking-tight"
                >
                  Work Experience
                </h3>
              </div>
              <div data-slot="card-content" className="grow p-5">
                <div className="grid gap-y-5">
                  <div>
                    <div className="flex align-start gap-3.5">
                      <img
                        className="h-9"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/brand-logos/jira.svg"
                      />
                      <div className="flex flex-col gap-1">
                        <a
                          className="text-sm font-medium text-primary leading-none hover:text-primary-active"
                          href="/metronic/tailwind/react/demo1/public-profile/profiles/default"
                          data-discover="true"
                        >
                          Esprito Studios
                        </a>
                        <span className="text-sm font-medium text-mono">
                          Senior Project Manager
                        </span>
                        <span className="text-xs text-secondary-foreground leading-none">
                          2019 - Present
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-secondary-foreground font-semibold text-sm leading-none">
                      Previous Jobs
                    </div>
                  </div>
                  <div>
                    <div className="flex align-start gap-3.5">
                      <img
                        className="h-9"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/brand-logos/weave.svg"
                      />
                      <div className="flex flex-col gap-1">
                        <a
                          className="text-sm font-medium text-primary leading-none hover:text-primary-active"
                          href="/metronic/tailwind/react/demo1/public-profile/profiles/default"
                          data-discover="true"
                        >
                          Pesto Plus
                        </a>
                        <span className="text-sm font-medium text-mono">CRM Product Lead </span>
                        <span className="text-xs text-secondary-foreground leading-none">
                          2012 - 2019
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex align-start gap-3.5">
                      <img
                        className="h-9"
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/brand-logos/perrier.svg"
                      />
                      <div className="flex flex-col gap-1">
                        <a
                          className="text-sm font-medium text-primary leading-none hover:text-primary-active"
                          href="/metronic/tailwind/react/demo1/public-profile/profiles/default"
                          data-discover="true"
                        >
                          Perrier Technologies
                        </a>
                        <span className="text-sm font-medium text-mono">UX Research</span>
                        <span className="text-xs text-secondary-foreground leading-none">
                          2010 - 2012
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-slot="card-footer"
                className="flex items-center px-5 min-h-14 border-t border-border justify-center"
              >
                <a
                  data-slot="button"
                  className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent font-medium text-primary hover:text-primary/90 [&_svg]:opacity-60 underline underline-offset-4 decoration-dashed decoration-1"
                  href="/metronic/tailwind/react/demo1/public-profile/works"
                  data-discover="true"
                >
                  Open to Work
                </a>
              </div>
            </div>
            <div
              data-slot="card"
              className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5"
            >
              <div
                data-slot="card-header"
                className="flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5 border-b border-border"
              >
                <h3
                  data-slot="card-title"
                  className="text-base font-semibold leading-none tracking-tight"
                >
                  Skills
                </h3>
              </div>
              <div data-slot="card-content" className="grow p-5">
                <div className="flex flex-wrap gap-2.5 mb-2">
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-secondary text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Web Design
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-secondary text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Code Review
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-secondary text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Figma
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-secondary text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Product Development
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-secondary text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Webflow
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-secondary text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    AI
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-secondary text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    noCode
                  </span>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 bg-secondary text-secondary-foreground rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5"
                  >
                    Management
                  </span>
                </div>
              </div>
            </div>
            <div
              data-slot="card"
              className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5"
            >
              <div
                data-slot="card-header"
                className="flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5 border-b border-border"
              >
                <h3
                  data-slot="card-title"
                  className="text-base font-semibold leading-none tracking-tight"
                >
                  Recent Uploads
                </h3>
                <button
                  data-slot="dropdown-menu-trigger"
                  className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                  type="button"
                  id="radix-«rsc»"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  data-state="closed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-ellipsis-vertical"
                    aria-hidden="true"
                  >
                    <circle cx={12} cy={12} r={1} />
                    <circle cx={12} cy={5} r={1} />
                    <circle cx={12} cy={19} r={1} />
                  </svg>
                </button>
              </div>
              <div data-slot="card-content" className="grow p-5">
                <div className="grid gap-2.5 lg:gap-5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center grow gap-2.5">
                      <img
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/file-types/pdf.svg"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-mono cursor-pointer hover:text-primary mb-px">
                          Project-pitch.pdf
                        </span>
                        <span className="text-xs text-secondary-foreground">
                          4.7 MB 26 Sep 2024 3:20 PM
                        </span>
                      </div>
                    </div>
                    <button
                      data-slot="dropdown-menu-trigger"
                      className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                      type="button"
                      id="radix-«rse»"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      data-state="closed"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-ellipsis-vertical"
                        aria-hidden="true"
                      >
                        <circle cx={12} cy={12} r={1} />
                        <circle cx={12} cy={5} r={1} />
                        <circle cx={12} cy={19} r={1} />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center grow gap-2.5">
                      <img
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/file-types/doc.svg"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-mono cursor-pointer hover:text-primary mb-px">
                          Report-v1.docx
                        </span>
                        <span className="text-xs text-secondary-foreground">
                          2.3 MB 1 Oct 2024 12:00 PM
                        </span>
                      </div>
                    </div>
                    <button
                      data-slot="dropdown-menu-trigger"
                      className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                      type="button"
                      id="radix-«rsg»"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      data-state="closed"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-ellipsis-vertical"
                        aria-hidden="true"
                      >
                        <circle cx={12} cy={12} r={1} />
                        <circle cx={12} cy={5} r={1} />
                        <circle cx={12} cy={19} r={1} />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center grow gap-2.5">
                      <img
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/file-types/ai.svg"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-mono cursor-pointer hover:text-primary mb-px">
                          Framework-App.js
                        </span>
                        <span className="text-xs text-secondary-foreground">
                          0.8 MB 17 Oct 2024 6:46 PM
                        </span>
                      </div>
                    </div>
                    <button
                      data-slot="dropdown-menu-trigger"
                      className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                      type="button"
                      id="radix-«rsi»"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      data-state="closed"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-ellipsis-vertical"
                        aria-hidden="true"
                      >
                        <circle cx={12} cy={12} r={1} />
                        <circle cx={12} cy={5} r={1} />
                        <circle cx={12} cy={19} r={1} />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center grow gap-2.5">
                      <img
                        alt="image"
                        src="/metronic/tailwind/react/demo1/media/file-types/js.svg"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-mono cursor-pointer hover:text-primary mb-px">
                          Mobile-logo.ai
                        </span>
                        <span className="text-xs text-secondary-foreground">
                          0.2 MB 4 Nov 2024 11:30 AM
                        </span>
                      </div>
                    </div>
                    <button
                      data-slot="dropdown-menu-trigger"
                      className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                      type="button"
                      id="radix-«rsk»"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      data-state="closed"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-ellipsis-vertical"
                        aria-hidden="true"
                      >
                        <circle cx={12} cy={12} r={1} />
                        <circle cx={12} cy={5} r={1} />
                        <circle cx={12} cy={19} r={1} />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div
                data-slot="card-footer"
                className="flex items-center px-5 min-h-14 border-t border-border justify-center"
              >
                <a
                  data-slot="button"
                  className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent font-medium text-primary hover:text-primary/90 [&_svg]:opacity-60 underline underline-offset-4 decoration-dashed decoration-1"
                  href="/metronic/tailwind/react/demo1/account/integrations"
                  data-discover="true"
                >
                  All Files
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            <div className="flex flex-col gap-5 lg:gap-7.5">
              <div
                data-slot="card"
                className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5"
              >
                <div data-slot="card-content" className="grow p-5 px-10 py-7.5 lg:pe-12.5">
                  <div className="flex flex-wrap md:flex-nowrap items-center gap-6 md:gap-10">
                    <div className="flex flex-col gap-3">
                      <h2 className="text-xl font-semibold text-mono">
                        Unlock Creative <br />
                        Partnerships on Our Blog
                      </h2>
                      <p className="text-sm text-secondary-foreground leading-5.5">
                        Explore exciting collaboration opportunities with our blog. We're open to
                        partnerships, guest posts, and more. Join us to share your insights and grow
                        your audience.
                      </p>
                    </div>
                    <img
                      className="dark:hidden max-h-[160px]"
                      alt="image"
                      src="/metronic/tailwind/react/demo1/media/illustrations/1.svg"
                    />
                    <img
                      className="light:hidden max-h-[160px]"
                      alt="image"
                      src="/metronic/tailwind/react/demo1/media/illustrations/1-dark.svg"
                    />
                  </div>
                </div>
                <div
                  data-slot="card-footer"
                  className="flex items-center px-5 min-h-14 border-t border-border justify-center"
                >
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent font-medium text-primary hover:text-primary/90 [&_svg]:opacity-60 underline underline-offset-4 decoration-dashed decoration-1"
                    href="/metronic/tailwind/react/demo1/network/get-started"
                    data-discover="true"
                  >
                    Get Started
                  </a>
                </div>
              </div>
              <div
                data-slot="card"
                className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5"
              >
                <div
                  data-slot="card-header"
                  className="flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5 border-b border-border"
                >
                  <h3
                    data-slot="card-title"
                    className="text-base font-semibold leading-none tracking-tight"
                  >
                    Media Uploads
                  </h3>
                  <button
                    data-slot="dropdown-menu-trigger"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                    type="button"
                    id="radix-«rsm»"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    data-state="closed"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-ellipsis-vertical"
                      aria-hidden="true"
                    >
                      <circle cx={12} cy={12} r={1} />
                      <circle cx={12} cy={5} r={1} />
                      <circle cx={12} cy={19} r={1} />
                    </svg>
                  </button>
                </div>
                <div className="px-3 py-1">
                  <div className="h-[300px] flex items-center justify-center text-center">
                    <span>Drag and drop your files here</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
              <div
                data-slot="card"
                className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5"
              >
                <div
                  data-slot="card-header"
                  className="flex items-center justify-between flex-wrap px-5 min-h-14 border-b border-border gap-2"
                >
                  <h3
                    data-slot="card-title"
                    className="text-base font-semibold leading-none tracking-tight"
                  >
                    Contributors
                  </h3>
                  <button
                    data-slot="dropdown-menu-trigger"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                    type="button"
                    id="radix-«rso»"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    data-state="closed"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-ellipsis-vertical"
                      aria-hidden="true"
                    >
                      <circle cx={12} cy={12} r={1} />
                      <circle cx={12} cy={5} r={1} />
                      <circle cx={12} cy={19} r={1} />
                    </svg>
                  </button>
                </div>
                <div data-slot="card-content" className="grow p-5">
                  <div className="flex flex-col gap-2 lg:gap-5">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center grow gap-2.5">
                        <img
                          className="rounded-full size-9 shrink-0"
                          alt="image"
                          src="/metronic/tailwind/react/demo1/media/avatars/300-3.png"
                        />
                        <div className="flex flex-col">
                          <a
                            className="text-sm font-semibold text-mono hover:text-primary-active mb-px"
                            href="/metronic/tailwind/react/demo1/public-profile/profiles/default"
                            data-discover="true"
                          >
                            Tyler Hero
                          </a>
                          <span className="text-xs font-semibold text-secondary-foreground">
                            6 contributors
                          </span>
                        </div>
                      </div>
                      <button
                        data-slot="dropdown-menu-trigger"
                        className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                        type="button"
                        id="radix-«rsq»"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        data-state="closed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-ellipsis-vertical"
                          aria-hidden="true"
                        >
                          <circle cx={12} cy={12} r={1} />
                          <circle cx={12} cy={5} r={1} />
                          <circle cx={12} cy={19} r={1} />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center grow gap-2.5">
                        <img
                          className="rounded-full size-9 shrink-0"
                          alt="image"
                          src="/metronic/tailwind/react/demo1/media/avatars/300-1.png"
                        />
                        <div className="flex flex-col">
                          <a
                            className="text-sm font-semibold text-mono hover:text-primary-active mb-px"
                            href="/metronic/tailwind/react/demo1/public-profile/profiles/default"
                            data-discover="true"
                          >
                            Esther Howard
                          </a>
                          <span className="text-xs font-semibold text-secondary-foreground">
                            29 contributors
                          </span>
                        </div>
                      </div>
                      <button
                        data-slot="dropdown-menu-trigger"
                        className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                        type="button"
                        id="radix-«rss»"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        data-state="closed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-ellipsis-vertical"
                          aria-hidden="true"
                        >
                          <circle cx={12} cy={12} r={1} />
                          <circle cx={12} cy={5} r={1} />
                          <circle cx={12} cy={19} r={1} />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center grow gap-2.5">
                        <img
                          className="rounded-full size-9 shrink-0"
                          alt="image"
                          src="/metronic/tailwind/react/demo1/media/avatars/300-14.png"
                        />
                        <div className="flex flex-col">
                          <a
                            className="text-sm font-semibold text-mono hover:text-primary-active mb-px"
                            href="/metronic/tailwind/react/demo1/public-profile/profiles/default"
                            data-discover="true"
                          >
                            Cody Fisher
                          </a>
                          <span className="text-xs font-semibold text-secondary-foreground">
                            34 contributors
                          </span>
                        </div>
                      </div>
                      <button
                        data-slot="dropdown-menu-trigger"
                        className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                        type="button"
                        id="radix-«rsu»"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        data-state="closed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-ellipsis-vertical"
                          aria-hidden="true"
                        >
                          <circle cx={12} cy={12} r={1} />
                          <circle cx={12} cy={5} r={1} />
                          <circle cx={12} cy={19} r={1} />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center grow gap-2.5">
                        <img
                          className="rounded-full size-9 shrink-0"
                          alt="image"
                          src="/metronic/tailwind/react/demo1/media/avatars/300-7.png"
                        />
                        <div className="flex flex-col">
                          <a
                            className="text-sm font-semibold text-mono hover:text-primary-active mb-px"
                            href="/metronic/tailwind/react/demo1/public-profile/profiles/default"
                            data-discover="true"
                          >
                            Arlene McCoy
                          </a>
                          <span className="text-xs font-semibold text-secondary-foreground">
                            1 contributors
                          </span>
                        </div>
                      </div>
                      <button
                        data-slot="dropdown-menu-trigger"
                        className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                        type="button"
                        id="radix-«rt0»"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        data-state="closed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-ellipsis-vertical"
                          aria-hidden="true"
                        >
                          <circle cx={12} cy={12} r={1} />
                          <circle cx={12} cy={5} r={1} />
                          <circle cx={12} cy={19} r={1} />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  data-slot="card-footer"
                  className="flex items-center px-5 min-h-14 border-t border-border justify-center"
                >
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent font-medium text-primary hover:text-primary/90 [&_svg]:opacity-60 underline underline-offset-4 decoration-dashed decoration-1"
                    href="/metronic/tailwind/react/demo1/public-profile/network"
                    data-discover="true"
                  >
                    All Contributors
                  </a>
                </div>
              </div>
              <div
                data-slot="card"
                className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5"
              >
                <div
                  data-slot="card-header"
                  className="flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5 border-b border-border"
                >
                  <h3
                    data-slot="card-title"
                    className="text-base font-semibold leading-none tracking-tight"
                  >
                    Assistance
                  </h3>
                  <button
                    data-slot="dropdown-menu-trigger"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                    type="button"
                    id="radix-«rt2»"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    data-state="closed"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-ellipsis-vertical"
                      aria-hidden="true"
                    >
                      <circle cx={12} cy={12} r={1} />
                      <circle cx={12} cy={5} r={1} />
                      <circle cx={12} cy={19} r={1} />
                    </svg>
                  </button>
                </div>
                <div
                  data-slot="card-content"
                  className="grow p-5 flex justify-center items-center px-3 py-1"
                >
                  <div>
                    <p className="text-sm text-muted-foreground">How can I assist you today?</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-slot="card"
              className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5"
            >
              <div
                data-slot="card-header"
                className="flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5 border-b border-border"
              >
                <h3
                  data-slot="card-title"
                  className="text-base font-semibold leading-none tracking-tight"
                >
                  Projects
                </h3>
                <button
                  data-slot="dropdown-menu-trigger"
                  className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                  type="button"
                  id="radix-«rt4»"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  data-state="closed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-ellipsis-vertical"
                    aria-hidden="true"
                  >
                    <circle cx={12} cy={12} r={1} />
                    <circle cx={12} cy={5} r={1} />
                    <circle cx={12} cy={19} r={1} />
                  </svg>
                </button>
              </div>
              <div data-slot="card-content" className="grow kt-scrollable-x-auto p-0">
                <div data-slot="table-wrapper" className="relative w-full overflow-auto">
                  <table
                    data-slot="table"
                    className="w-full caption-bottom text-foreground text-sm"
                  >
                    <thead data-slot="table-header" className="[&_tr]:border-b bg-muted">
                      <tr
                        data-slot="table-row"
                        className="border-b transition-colors [&:has(td):hover]:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <th
                          data-slot="table-head"
                          className="px-4 text-left rtl:text-right align-middle font-normal text-muted-foreground [&:has([role=checkbox])]:pe-0 min-w-52 text-secondary-foreground h-10"
                        >
                          Project Name
                        </th>
                        <th
                          data-slot="table-head"
                          className="px-4 text-left rtl:text-right align-middle font-normal text-muted-foreground [&:has([role=checkbox])]:pe-0 min-w-40 text-secondary-foreground h-10"
                        >
                          Progress
                        </th>
                        <th
                          data-slot="table-head"
                          className="px-4 rtl:text-right align-middle font-normal text-muted-foreground [&:has([role=checkbox])]:pe-0 text-end min-w-32 text-secondary-foreground h-10"
                        >
                          People
                        </th>
                        <th
                          data-slot="table-head"
                          className="px-4 rtl:text-right align-middle font-normal text-muted-foreground [&:has([role=checkbox])]:pe-0 text-end min-w-32 font-normal! text-secondary-foreground! h-10"
                        >
                          Due Date
                        </th>
                        <th
                          data-slot="table-head"
                          className="px-4 text-left rtl:text-right align-middle font-normal text-muted-foreground [&:has([role=checkbox])]:pe-0 w-[30px] h-10"
                        />
                      </tr>
                    </thead>
                    <tbody data-slot="table-body" className="[&_tr:last-child]:border-0">
                      <tr
                        data-slot="table-row"
                        className="border-b transition-colors [&:has(td):hover]:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-start py-2"
                        >
                          <a
                            className="text-sm font-medium text-mono hover:text-primary"
                            href="/metronic/tailwind/react/demo1/public-profile/profiles/default"
                            data-discover="true"
                          >
                            Acme software development
                          </a>
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0"
                        >
                          <div
                            aria-valuemax={100}
                            aria-valuemin={0}
                            role="progressbar"
                            data-state="indeterminate"
                            data-max={100}
                            data-slot="progress"
                            className="relative w-full overflow-hidden rounded-full bg-secondary h-1"
                          >
                            <div
                              data-state="indeterminate"
                              data-max={100}
                              data-slot="progress-indicator"
                              className="h-full w-full flex-1 transition-all bg-primary"
                              style={{ transform: 'translateX(-40%)' }}
                            />
                          </div>
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0"
                        >
                          <div className="flex justify-end rtl:justify-start shrink-0">
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
                                +3
                              </span>
                            </div>
                          </div>
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-end text-sm font-medium text-secondary-foreground"
                        >
                          24 Aug, 2024
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-start"
                        >
                          <button
                            data-slot="dropdown-menu-trigger"
                            className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                            type="button"
                            id="radix-«rt6»"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            data-state="closed"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-ellipsis-vertical"
                              aria-hidden="true"
                            >
                              <circle cx={12} cy={12} r={1} />
                              <circle cx={12} cy={5} r={1} />
                              <circle cx={12} cy={19} r={1} />
                            </svg>
                          </button>
                        </td>
                      </tr>
                      <tr
                        data-slot="table-row"
                        className="border-b transition-colors [&:has(td):hover]:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-start py-2"
                        >
                          <a
                            className="text-sm font-medium text-mono hover:text-primary"
                            href="/metronic/tailwind/react/demo1/public-profile/profiles/default"
                            data-discover="true"
                          >
                            Strategic Partnership Deal
                          </a>
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0"
                        >
                          <div
                            aria-valuemax={100}
                            aria-valuemin={0}
                            role="progressbar"
                            data-state="indeterminate"
                            data-max={100}
                            data-slot="progress"
                            className="relative w-full overflow-hidden rounded-full bg-secondary h-1"
                          >
                            <div
                              data-state="indeterminate"
                              data-max={100}
                              data-slot="progress-indicator"
                              className="h-full w-full flex-1 transition-all bg-secondary"
                              style={{ transform: 'translateX(0%)' }}
                            />
                          </div>
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0"
                        >
                          <div className="flex justify-end rtl:justify-start shrink-0">
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
                                    src="/metronic/tailwind/react/demo1/media/avatars/300-2.png"
                                  />
                                </div>
                              </span>
                              <span data-slot="avatar" className="relative flex shrink-0 size-7">
                                <span
                                  data-slot="avatar-fallback"
                                  className="flex h-full w-full items-center justify-center rounded-full relative border-1 border-background hover:z-10 text-[11px] text-destructive-foreground ring-background bg-destructive"
                                >
                                  M
                                </span>
                              </span>
                            </div>
                          </div>
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-end text-sm font-medium text-secondary-foreground"
                        >
                          10 Sep, 2024
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-start"
                        >
                          <button
                            data-slot="dropdown-menu-trigger"
                            className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                            type="button"
                            id="radix-«rt8»"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            data-state="closed"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-ellipsis-vertical"
                              aria-hidden="true"
                            >
                              <circle cx={12} cy={12} r={1} />
                              <circle cx={12} cy={5} r={1} />
                              <circle cx={12} cy={19} r={1} />
                            </svg>
                          </button>
                        </td>
                      </tr>
                      <tr
                        data-slot="table-row"
                        className="border-b transition-colors [&:has(td):hover]:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-start py-2"
                        >
                          <a
                            className="text-sm font-medium text-mono hover:text-primary"
                            href="/metronic/tailwind/react/demo1/public-profile/profiles/default"
                            data-discover="true"
                          >
                            Client Onboarding
                          </a>
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0"
                        >
                          <div
                            aria-valuemax={100}
                            aria-valuemin={0}
                            role="progressbar"
                            data-state="indeterminate"
                            data-max={100}
                            data-slot="progress"
                            className="relative w-full overflow-hidden rounded-full bg-secondary h-1"
                          >
                            <div
                              data-state="indeterminate"
                              data-max={100}
                              data-slot="progress-indicator"
                              className="h-full w-full flex-1 transition-all bg-primary"
                              style={{ transform: 'translateX(-80%)' }}
                            />
                          </div>
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0"
                        >
                          <div className="flex justify-end rtl:justify-start shrink-0">
                            <div className="flex -space-x-2">
                              <span data-slot="avatar" className="relative flex shrink-0 size-7">
                                <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                                  <img
                                    data-slot="avatar-image"
                                    className="aspect-square h-full w-full"
                                    alt="image"
                                    src="/metronic/tailwind/react/demo1/media/avatars/300-20.png"
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
                            </div>
                          </div>
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-end text-sm font-medium text-secondary-foreground"
                        >
                          19 Sep, 2024
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-start"
                        >
                          <button
                            data-slot="dropdown-menu-trigger"
                            className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                            type="button"
                            id="radix-«rta»"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            data-state="closed"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-ellipsis-vertical"
                              aria-hidden="true"
                            >
                              <circle cx={12} cy={12} r={1} />
                              <circle cx={12} cy={5} r={1} />
                              <circle cx={12} cy={19} r={1} />
                            </svg>
                          </button>
                        </td>
                      </tr>
                      <tr
                        data-slot="table-row"
                        className="border-b transition-colors [&:has(td):hover]:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-start py-2"
                        >
                          <a
                            className="text-sm font-medium text-mono hover:text-primary"
                            href="/metronic/tailwind/react/demo1/public-profile/profiles/default"
                            data-discover="true"
                          >
                            Widget Supply Agreement
                          </a>
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0"
                        >
                          <div
                            aria-valuemax={100}
                            aria-valuemin={0}
                            role="progressbar"
                            data-state="indeterminate"
                            data-max={100}
                            data-slot="progress"
                            className="relative w-full overflow-hidden rounded-full bg-secondary h-1"
                          >
                            <div
                              data-state="indeterminate"
                              data-max={100}
                              data-slot="progress-indicator"
                              className="h-full w-full flex-1 transition-all bg-green-500"
                              style={{ transform: 'translateX(0%)' }}
                            />
                          </div>
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0"
                        >
                          <div className="flex justify-end rtl:justify-start shrink-0">
                            <div className="flex -space-x-2">
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
                                    src="/metronic/tailwind/react/demo1/media/avatars/300-12.png"
                                  />
                                </div>
                              </span>
                              <span className="flex items-center cursor-default justify-center relative shrink-0 rounded-full border-1 border-background hover:z-10 font-semibold text-[11px] leading-none size-7 text-primary-foreground ring-background bg-primary">
                                +1
                              </span>
                            </div>
                          </div>
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-end text-sm font-medium text-secondary-foreground"
                        >
                          5 May, 2024
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-start"
                        >
                          <button
                            data-slot="dropdown-menu-trigger"
                            className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                            type="button"
                            id="radix-«rtc»"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            data-state="closed"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-ellipsis-vertical"
                              aria-hidden="true"
                            >
                              <circle cx={12} cy={12} r={1} />
                              <circle cx={12} cy={5} r={1} />
                              <circle cx={12} cy={19} r={1} />
                            </svg>
                          </button>
                        </td>
                      </tr>
                      <tr
                        data-slot="table-row"
                        className="border-b transition-colors [&:has(td):hover]:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-start py-2"
                        >
                          <a
                            className="text-sm font-medium text-mono hover:text-primary"
                            href="/metronic/tailwind/react/demo1/public-profile/profiles/default"
                            data-discover="true"
                          >
                            Project X Redesign
                          </a>
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0"
                        >
                          <div
                            aria-valuemax={100}
                            aria-valuemin={0}
                            role="progressbar"
                            data-state="indeterminate"
                            data-max={100}
                            data-slot="progress"
                            className="relative w-full overflow-hidden rounded-full bg-secondary h-1"
                          >
                            <div
                              data-state="indeterminate"
                              data-max={100}
                              data-slot="progress-indicator"
                              className="h-full w-full flex-1 transition-all bg-primary"
                              style={{ transform: 'translateX(-20%)' }}
                            />
                          </div>
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0"
                        >
                          <div className="flex justify-end rtl:justify-start shrink-0">
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
                                    src="/metronic/tailwind/react/demo1/media/avatars/300-15.png"
                                  />
                                </div>
                              </span>
                              <span data-slot="avatar" className="relative flex shrink-0 size-7">
                                <div className="relative overflow-hidden rounded-full border-1 border-background hover:z-10">
                                  <img
                                    data-slot="avatar-image"
                                    className="aspect-square h-full w-full"
                                    alt="image"
                                    src="/metronic/tailwind/react/demo1/media/avatars/300-18.png"
                                  />
                                </div>
                              </span>
                              <span className="flex items-center cursor-default justify-center relative shrink-0 rounded-full border-1 border-background hover:z-10 font-semibold text-[11px] leading-none size-7 text-white ring-background bg-green-500">
                                +2
                              </span>
                            </div>
                          </div>
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-end text-sm font-medium text-secondary-foreground"
                        >
                          1 Feb, 2025
                        </td>
                        <td
                          data-slot="table-cell"
                          className="p-4 align-middle [&:has([role=checkbox])]:pe-0 text-start"
                        >
                          <button
                            data-slot="dropdown-menu-trigger"
                            className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 select-none"
                            type="button"
                            id="radix-«rte»"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            data-state="closed"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-ellipsis-vertical"
                              aria-hidden="true"
                            >
                              <circle cx={12} cy={12} r={1} />
                              <circle cx={12} cy={5} r={1} />
                              <circle cx={12} cy={19} r={1} />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                data-slot="card-footer"
                className="flex items-center px-5 min-h-14 border-t border-border justify-center"
              >
                <a
                  data-slot="button"
                  className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent font-medium text-primary hover:text-primary/90 [&_svg]:opacity-60 underline underline-offset-4 decoration-dashed decoration-1"
                  href="/metronic/tailwind/react/demo1/public-profile/projects/3-columns"
                  data-discover="true"
                >
                  All Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
