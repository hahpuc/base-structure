import React from 'react';

interface ActivityTabProps {
  filterType?: string;
}

const ActivityTab: React.FC<ActivityTabProps> = () => {
  return (
    <div className="flex gap-5 lg:gap-7.5">
      <div
        data-slot="card"
        className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 grow"
        id="activity_2025"
      >
        <div
          data-slot="card-header"
          className="flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5 border-b border-border"
        >
          <h3
            data-slot="card-title"
            className="text-base font-semibold leading-none tracking-tight"
          >
            Activity
          </h3>
          <div className="flex items-center space-x-2.5">
            <label
              data-slot="label"
              className="text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50 font-medium text-sm"
              htmlFor="simple-switch"
            >
              Auto refresh:
            </label>
            Off
            <button
              type="button"
              role="switch"
              aria-checked="false"
              data-state="unchecked"
              value="on"
              data-slot="switch"
              className="relative peer inline-flex shrink-0 cursor-pointer items-center transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-input aria-invalid:border aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20 [[data-invalid=true]_&]:border [[data-invalid=true]_&]:border-destructive/60 [[data-invalid=true]_&]:ring-destructive/10 dark:[[data-invalid=true]_&]:border-destructive dark:[[data-invalid=true]_&]:ring-destructive/20 rounded-full h-5 w-8 data-[state=checked]:bg-primary ms-2"
              id="simple-switch"
            >
              <span
                data-state="unchecked"
                className="pointer-events-none block bg-white w-1/2 h-[calc(100%-4px)] shadow-lg ring-0 transition-transform start-0 data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[calc(100%-2px)] rtl:data-[state=unchecked]:-translate-x-[2px] rtl:data-[state=checked]:-translate-x-[calc(100%-2px)] rounded-full"
              />
            </button>
          </div>
        </div>
        <div data-slot="card-content" className="grow p-5">
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-users text-base"
                aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <circle cx={9} cy={7} r={4} />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  Posted a new article{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/blogger"
                    data-discover="true"
                  >
                    Top 10 Tech Trends
                  </a>
                </div>
                <span className="text-xs text-secondary-foreground">Today, 9:00 AM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-log-in text-base"
                aria-hidden="true"
              >
                <path d="m10 17 5-5-5-5" />
                <path d="M15 12H3" />
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  I had the privilege of interviewing an industry expert for an{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/blogger"
                    data-discover="true"
                  >
                    upcoming blog post
                  </a>
                </div>
                <span className="text-xs text-secondary-foreground">2 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-square-dashed-bottom-code text-base"
                aria-hidden="true"
              >
                <path d="M10 9.5 8 12l2 2.5" />
                <path d="M14 21h1" />
                <path d="m14 9.5 2 2.5-2 2.5" />
                <path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2" />
                <path d="M9 21h1" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col pb-2.5">
                <span className="text-sm text-foreground">
                  Jenny attended a Nature Photography Immersion workshop
                </span>
                <span className="text-xs text-secondary-foreground">3 days ago, 11:45 AM</span>
              </div>
              <div
                data-slot="card"
                className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border black/5 shadow-none"
              >
                <div data-slot="card-content" className="grow p-5">
                  <div className="grid gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-5">
                      <div className="flex items-center gap-5 shrink-0">
                        <div className="border border-orange-200 rounded-lg  max-h-20">
                          <div className="flex items-center justify-center border-b border-b-orange-200 bg-orange-50 dark:border-orange-950 dark:bg-orange-950/30 rounded-t-lg">
                            <span className="text-sm text-orange-400 font-medium p-2">Apr</span>
                          </div>
                          <div className="flex items-center justify-center size-12">
                            <span className="font-medium text-foreground text-xl tracking-tight">
                              02
                            </span>
                          </div>
                        </div>
                        <img
                          className="rounded-lg max-h-20 max-w-full"
                          alt="image"
                          src="/metronic/tailwind/react/demo1/media/images/600x400/8.jpg"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <a
                          data-slot="button"
                          className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 [&_svg:not([class*=size-])]:size-4 h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent text-xs text-orange-400 leading-[14px] hover:text-primary-active mb-px"
                          href="/metronic/tailwind/react/demo1/public-profile/activity"
                          data-discover="true"
                        >
                          Nature Photography Immersion
                        </a>
                        <a
                          data-slot="button"
                          className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 [&_svg:not([class*=size-])]:size-4 h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent text-base font-medium hover:text-primary text-mono leading-4"
                          href="/metronic/tailwind/react/demo1/public-profile/activity"
                          data-discover="true"
                        >
                          Nature Photography Immersion
                        </a>
                        <p className="text-xs text-foreground leading-[22px]">
                          Enhance your nature photography skills in a hands-on workshop guided by
                          experienced photographers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-share2 lucide-share-2 text-base"
                aria-hidden="true"
              >
                <circle cx={18} cy={5} r={3} />
                <circle cx={6} cy={12} r={3} />
                <circle cx={18} cy={19} r={3} />
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  I couldn't resist sharing a sneak peek of our{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/blogger"
                    data-discover="true"
                  >
                    upcoming content
                  </a>
                </div>
                <span className="text-xs text-secondary-foreground">5 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-calendar-check2 lucide-calendar-check-2 text-base"
                aria-hidden="true"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
                <path d="M3 10h18" />
                <path d="m16 20 2 2 4-4" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col pb-2.5">
                <span className="text-sm text-foreground">
                  Jenny attended a webinar on new product features.
                </span>
                <span className="text-xs text-secondary-foreground">3 days ago, 11:45 AM</span>
              </div>
              <div
                data-slot="card"
                className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border black/5 shadow-none p-4"
              >
                <div className="flex flex-wrap gap-2.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-square-dashed-bottom-code text-lg text-violet-500"
                    aria-hidden="true"
                  >
                    <path d="M10 9.5 8 12l2 2.5" />
                    <path d="M14 21h1" />
                    <path d="m14 9.5 2 2.5-2 2.5" />
                    <path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2" />
                    <path d="M9 21h1" />
                  </svg>
                  <div className="flex flex-col gap-5 grow">
                    <div className="flex flex-wrap items-center justify-between">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-base font-medium text-mono cursor-pointer hover:text-primary mb-px">
                          Leadership Development Series: Part 1
                        </span>
                        <span className="text-xs text-secondary-foreground">
                          The first installment of a leadership development series.
                        </span>
                      </div>
                      <button
                        data-slot="button"
                        className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent font-medium text-primary hover:text-primary/90 [&_svg]:opacity-60 underline underline-offset-4 decoration-dashed decoration-1"
                      >
                        <a
                          href="/metronic/tailwind/react/demo1/account/members/teams"
                          data-discover="true"
                        >
                          View
                        </a>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-7.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-secondary-foreground">Code:</span>
                        <span className="text-sm text-primary">#leaderdev-1</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-secondary-foreground">Progress:</span>
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
                            className="h-full w-full flex-1 transition-all bg-green-500 min-w-[120px]"
                            style={{ transform: 'translateX(-20%)' }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 lg:min-w-24 shrink-0 max-w-auto">
                        <span className="text-sm text-secondary-foreground">Guests:</span>
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
                              +24
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-coffee text-base"
                aria-hidden="true"
              >
                <path d="M10 2v2" />
                <path d="M14 2v2" />
                <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
                <path d="M6 2v2" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-mono">
                  Reaching the milestone of{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/feeds"
                    data-discover="true"
                  >
                    10,000 followers
                  </a>{' '}
                  on the blog was a dream come true
                </div>
                <span className="text-xs text-secondary-foreground">5 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-rocket text-base"
                aria-hidden="true"
              >
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-mono">
                  Completed phase one of client project ahead of schedule.
                </div>
                <span className="text-xs text-secondary-foreground">6 days ago, 10:45 AM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-printer text-base"
                aria-hidden="true"
              >
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
                <rect x={6} y={14} width={12} height={8} rx={1} />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col pb-2.5">
                <span className="text-sm text-foreground">
                  Attending the virtual blogging conference was an enriching experience
                </span>
                <span className="text-xs text-secondary-foreground">2 days ago, 4:07 PM</span>
              </div>
              <div
                data-slot="card"
                className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border black/5 shadow-none"
              >
                <div data-slot="card-content" className="grow p-5 lg:py-4">
                  <div className="flex justify-center py-4">
                    <img
                      className="dark:hidden max-h-[160px]"
                      alt="image"
                      src="/metronic/tailwind/react/demo1/media/illustrations/3.svg"
                    />
                    <img
                      className="light:hidden max-h-[160px]"
                      alt="image"
                      src="/metronic/tailwind/react/demo1/media/illustrations/3-dark.svg"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-base font-medium text-mono text-center">
                      Blogging Conference
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <a
                        data-slot="button"
                        className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                        href="/metronic/tailwind/react/demo1/public-profile/profiles/company"
                        data-discover="true"
                      >
                        Axio new release
                      </a>
                      <span className="text-sm text-secondary-foreground me-2">email campaign</span>
                      <span
                        data-slot="badge"
                        className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5 text-[var(--color-success-accent,var(--color-green-800))] bg-[var(--color-success-soft,var(--color-green-100))] dark:bg-[var(--color-success-soft,var(--color-green-950))] dark:text-[var(--color-success-soft,var(--color-green-600))]"
                      >
                        Public
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-chart-spline text-base"
                aria-hidden="true"
              >
                <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  Onboarded a talented designer to our creative team, adding valuable expertise to
                  upcoming projects.
                </div>
                <span className="text-xs text-secondary-foreground">2 weeks ago, 10:45 AM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-square-dashed-bottom-code text-base"
                aria-hidden="true"
              >
                <path d="M10 9.5 8 12l2 2.5" />
                <path d="M14 21h1" />
                <path d="m14 9.5 2 2.5-2 2.5" />
                <path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2" />
                <path d="M9 21h1" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="grow">
                <div className="flex flex-col pb-2.5">
                  <div className="text-sm text-foreground">
                    A new team{' '}
                    <a
                      data-slot="button"
                      className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 [&_svg:not([class*=size-])]:size-4 h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent text-sm font-medium text-mono hover:text-primary-active"
                      href="/metronic/tailwind/react/demo1/public-profile/activity"
                      data-discover="true"
                    >
                      Market Mavericks
                    </a>{' '}
                    joined community
                  </div>
                  <span className="text-xs text-secondary-foreground">1 month ago, 11:45 AM</span>
                </div>
                <div
                  data-slot="card"
                  className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border black/5 shadow-none p-4"
                >
                  <div className="flex flex-wrap justify-between items-center gap-7">
                    <div className="flex items-center gap-4">
                      <div className="relative size-[50px] shrink-0">
                        <svg
                          className="w-full h-full stroke-blue-200 fill-blue-100 dark:stroke-blue-950 dark:fill-blue-950/30"
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
                            fill="none"
                          />
                          <path
                            d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506
                18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937
                39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z"
                            stroke="none"
                            strokeOpacity={1}
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
                      <div className="flex flex-col items-start gap-1.5">
                        <a
                          data-slot="button"
                          className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 [&_svg:not([class*=size-])]:size-4 h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent text-base font-medium hover:text-primary text-mono"
                          href="/metronic/tailwind/react/demo1/public-profile/activity"
                          data-discover="true"
                        >
                          Market Mavericks
                        </a>
                        <p className="text-sm text-secondary-foreground">
                          Navigating markets with strategic solutions
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 lg:gap-12">
                      <div className="flex flex-col items-end gap-5">
                        <span className="text-xs text-secondary-foreground uppercase">rating</span>
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
                      <div className="flex flex-col items-end gap-3 lg:min-w-24 shrink-0 max-w-auto">
                        <span className="text-xs text-secondary-foreground uppercase">members</span>
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
                            href="/metronic/tailwind/react/demo1/public-profile/activity"
                            data-discover="true"
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
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-badge-check text-base"
                aria-hidden="true"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-foreground">
                  Hosted a virtual{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/creator"
                    data-discover="true"
                  >
                    team-building event
                  </a>
                  , fostering collaboration and strengthening bonds among team members.
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  1 month ago, 13:56 PM
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-trophy text-base"
                aria-hidden="true"
              >
                <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
                <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
                <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
                <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
              </svg>
            </div>
            <div className="ps-2.5  text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  We recently{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/nft"
                    data-discover="true"
                  >
                    celebrated
                  </a>{' '}
                  the blog's 1-year anniversary
                </div>
                <span className="text-xs text-secondary-foreground">3 months ago, 4:07 PM</span>
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
            href="/metronic/tailwind/react/demo1/public-profile/activity"
            data-discover="true"
          >
            All-time Activity
          </a>
        </div>
      </div>
      <div
        data-slot="card"
        className="flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 grow hidden"
        id="activity_2024"
      >
        <div
          data-slot="card-header"
          className="flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5 border-b border-border"
        >
          <h3
            data-slot="card-title"
            className="text-base font-semibold leading-none tracking-tight"
          >
            Activity
          </h3>
          <div className="flex items-center space-x-2.5">
            <label
              data-slot="label"
              className="text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50 font-medium text-sm"
              htmlFor="simple-switch"
            >
              Auto refresh:
            </label>
            Off
            <button
              type="button"
              role="switch"
              aria-checked="false"
              data-state="unchecked"
              value="on"
              data-slot="switch"
              className="relative peer inline-flex shrink-0 cursor-pointer items-center transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-input aria-invalid:border aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20 [[data-invalid=true]_&]:border [[data-invalid=true]_&]:border-destructive/60 [[data-invalid=true]_&]:ring-destructive/10 dark:[[data-invalid=true]_&]:border-destructive dark:[[data-invalid=true]_&]:ring-destructive/20 rounded-full h-5 w-8 data-[state=checked]:bg-primary ms-2"
              id="simple-switch"
            >
              <span
                data-state="unchecked"
                className="pointer-events-none block bg-white w-1/2 h-[calc(100%-4px)] shadow-lg ring-0 transition-transform start-0 data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[calc(100%-2px)] rtl:data-[state=unchecked]:-translate-x-[2px] rtl:data-[state=checked]:-translate-x-[calc(100%-2px)] rounded-full"
              />
            </button>
          </div>
        </div>
        <div data-slot="card-content" className="grow p-5">
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-share2 lucide-share-2 text-base"
                aria-hidden="true"
              >
                <circle cx={18} cy={5} r={3} />
                <circle cx={6} cy={12} r={3} />
                <circle cx={18} cy={19} r={3} />
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  I couldn't resist sharing a sneak peek of our{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/blogger"
                    data-discover="true"
                  >
                    upcoming content
                  </a>
                </div>
                <span className="text-xs text-secondary-foreground">5 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-coffee text-base"
                aria-hidden="true"
              >
                <path d="M10 2v2" />
                <path d="M14 2v2" />
                <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
                <path d="M6 2v2" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-mono">
                  Reaching the milestone of{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/feeds"
                    data-discover="true"
                  >
                    10,000 followers
                  </a>{' '}
                  on the blog was a dream come true
                </div>
                <span className="text-xs text-secondary-foreground">5 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-chart-spline text-base"
                aria-hidden="true"
              >
                <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  Onboarded a talented designer to our creative team, adding valuable expertise to
                  upcoming projects.
                </div>
                <span className="text-xs text-secondary-foreground">2 weeks ago, 10:45 AM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-badge-check text-base"
                aria-hidden="true"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-foreground">
                  Hosted a virtual{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/creator"
                    data-discover="true"
                  >
                    team-building event
                  </a>
                  , fostering collaboration and strengthening bonds among team members.
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  1 month ago, 13:56 PM
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-trophy text-base"
                aria-hidden="true"
              >
                <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
                <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
                <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
                <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
              </svg>
            </div>
            <div className="ps-2.5  text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  We recently{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/nft"
                    data-discover="true"
                  >
                    celebrated
                  </a>{' '}
                  the blog's 1-year anniversary
                </div>
                <span className="text-xs text-secondary-foreground">3 months ago, 4:07 PM</span>
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
            href="/metronic/tailwind/react/demo1/public-profile/activity"
            data-discover="true"
          >
            All-time Activity
          </a>
        </div>
      </div>
      <div
        data-slot="card"
        className="flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 grow hidden"
        id="activity_2023"
      >
        <div
          data-slot="card-header"
          className="flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5 border-b border-border"
        >
          <h3
            data-slot="card-title"
            className="text-base font-semibold leading-none tracking-tight"
          >
            Activity
          </h3>
          <div className="flex items-center space-x-2.5">
            <label
              data-slot="label"
              className="text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50 font-medium text-sm"
              htmlFor="simple-switch"
            >
              Auto refresh:
            </label>
            Off
            <button
              type="button"
              role="switch"
              aria-checked="false"
              data-state="unchecked"
              value="on"
              data-slot="switch"
              className="relative peer inline-flex shrink-0 cursor-pointer items-center transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-input aria-invalid:border aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20 [[data-invalid=true]_&]:border [[data-invalid=true]_&]:border-destructive/60 [[data-invalid=true]_&]:ring-destructive/10 dark:[[data-invalid=true]_&]:border-destructive dark:[[data-invalid=true]_&]:ring-destructive/20 rounded-full h-5 w-8 data-[state=checked]:bg-primary ms-2"
              id="simple-switch"
            >
              <span
                data-state="unchecked"
                className="pointer-events-none block bg-white w-1/2 h-[calc(100%-4px)] shadow-lg ring-0 transition-transform start-0 data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[calc(100%-2px)] rtl:data-[state=unchecked]:-translate-x-[2px] rtl:data-[state=checked]:-translate-x-[calc(100%-2px)] rounded-full"
              />
            </button>
          </div>
        </div>
        <div data-slot="card-content" className="grow p-5">
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-users text-base"
                aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <circle cx={9} cy={7} r={4} />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  Posted a new article{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/blogger"
                    data-discover="true"
                  >
                    Top 10 Tech Trends
                  </a>
                </div>
                <span className="text-xs text-secondary-foreground">Today, 9:00 AM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-share2 lucide-share-2 text-base"
                aria-hidden="true"
              >
                <circle cx={18} cy={5} r={3} />
                <circle cx={6} cy={12} r={3} />
                <circle cx={18} cy={19} r={3} />
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  I couldn't resist sharing a sneak peek of our{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/blogger"
                    data-discover="true"
                  >
                    upcoming content
                  </a>
                </div>
                <span className="text-xs text-secondary-foreground">5 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-coffee text-base"
                aria-hidden="true"
              >
                <path d="M10 2v2" />
                <path d="M14 2v2" />
                <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
                <path d="M6 2v2" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-mono">
                  Reaching the milestone of{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/feeds"
                    data-discover="true"
                  >
                    10,000 followers
                  </a>{' '}
                  on the blog was a dream come true
                </div>
                <span className="text-xs text-secondary-foreground">5 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-chart-spline text-base"
                aria-hidden="true"
              >
                <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  Onboarded a talented designer to our creative team, adding valuable expertise to
                  upcoming projects.
                </div>
                <span className="text-xs text-secondary-foreground">2 weeks ago, 10:45 AM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-badge-check text-base"
                aria-hidden="true"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-foreground">
                  Hosted a virtual{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/creator"
                    data-discover="true"
                  >
                    team-building event
                  </a>
                  , fostering collaboration and strengthening bonds among team members.
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  1 month ago, 13:56 PM
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-trophy text-base"
                aria-hidden="true"
              >
                <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
                <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
                <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
                <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
              </svg>
            </div>
            <div className="ps-2.5  text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  We recently{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/nft"
                    data-discover="true"
                  >
                    celebrated
                  </a>{' '}
                  the blog's 1-year anniversary
                </div>
                <span className="text-xs text-secondary-foreground">3 months ago, 4:07 PM</span>
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
            href="/metronic/tailwind/react/demo1/public-profile/activity"
            data-discover="true"
          >
            All-time Activity
          </a>
        </div>
      </div>
      <div
        data-slot="card"
        className="flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 grow hidden"
        id="activity_2022"
      >
        <div
          data-slot="card-header"
          className="flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5 border-b border-border"
        >
          <h3
            data-slot="card-title"
            className="text-base font-semibold leading-none tracking-tight"
          >
            Activity
          </h3>
          <div className="flex items-center space-x-2.5">
            <label
              data-slot="label"
              className="text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50 font-medium text-sm"
              htmlFor="simple-switch"
            >
              Auto refresh:
            </label>
            Off
            <button
              type="button"
              role="switch"
              aria-checked="false"
              data-state="unchecked"
              value="on"
              data-slot="switch"
              className="relative peer inline-flex shrink-0 cursor-pointer items-center transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-input aria-invalid:border aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20 [[data-invalid=true]_&]:border [[data-invalid=true]_&]:border-destructive/60 [[data-invalid=true]_&]:ring-destructive/10 dark:[[data-invalid=true]_&]:border-destructive dark:[[data-invalid=true]_&]:ring-destructive/20 rounded-full h-5 w-8 data-[state=checked]:bg-primary ms-2"
              id="simple-switch"
            >
              <span
                data-state="unchecked"
                className="pointer-events-none block bg-white w-1/2 h-[calc(100%-4px)] shadow-lg ring-0 transition-transform start-0 data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[calc(100%-2px)] rtl:data-[state=unchecked]:-translate-x-[2px] rtl:data-[state=checked]:-translate-x-[calc(100%-2px)] rounded-full"
              />
            </button>
          </div>
        </div>
        <div data-slot="card-content" className="grow p-5">
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-users text-base"
                aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <circle cx={9} cy={7} r={4} />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  Posted a new article{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/blogger"
                    data-discover="true"
                  >
                    Top 10 Tech Trends
                  </a>
                </div>
                <span className="text-xs text-secondary-foreground">Today, 9:00 AM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-log-in text-base"
                aria-hidden="true"
              >
                <path d="m10 17 5-5-5-5" />
                <path d="M15 12H3" />
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  I had the privilege of interviewing an industry expert for an{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/blogger"
                    data-discover="true"
                  >
                    upcoming blog post
                  </a>
                </div>
                <span className="text-xs text-secondary-foreground">2 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-share2 lucide-share-2 text-base"
                aria-hidden="true"
              >
                <circle cx={18} cy={5} r={3} />
                <circle cx={6} cy={12} r={3} />
                <circle cx={18} cy={19} r={3} />
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  I couldn't resist sharing a sneak peek of our{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/blogger"
                    data-discover="true"
                  >
                    upcoming content
                  </a>
                </div>
                <span className="text-xs text-secondary-foreground">5 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-coffee text-base"
                aria-hidden="true"
              >
                <path d="M10 2v2" />
                <path d="M14 2v2" />
                <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
                <path d="M6 2v2" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-mono">
                  Reaching the milestone of{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/feeds"
                    data-discover="true"
                  >
                    10,000 followers
                  </a>{' '}
                  on the blog was a dream come true
                </div>
                <span className="text-xs text-secondary-foreground">5 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-chart-spline text-base"
                aria-hidden="true"
              >
                <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  Onboarded a talented designer to our creative team, adding valuable expertise to
                  upcoming projects.
                </div>
                <span className="text-xs text-secondary-foreground">2 weeks ago, 10:45 AM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-badge-check text-base"
                aria-hidden="true"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-foreground">
                  Hosted a virtual{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/creator"
                    data-discover="true"
                  >
                    team-building event
                  </a>
                  , fostering collaboration and strengthening bonds among team members.
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  1 month ago, 13:56 PM
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-trophy text-base"
                aria-hidden="true"
              >
                <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
                <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
                <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
                <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
              </svg>
            </div>
            <div className="ps-2.5  text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  We recently{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/nft"
                    data-discover="true"
                  >
                    celebrated
                  </a>{' '}
                  the blog's 1-year anniversary
                </div>
                <span className="text-xs text-secondary-foreground">3 months ago, 4:07 PM</span>
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
            href="/metronic/tailwind/react/demo1/public-profile/activity"
            data-discover="true"
          >
            All-time Activity
          </a>
        </div>
      </div>
      <div
        data-slot="card"
        className="flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 grow hidden"
        id="activity_2021"
      >
        <div
          data-slot="card-header"
          className="flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5 border-b border-border"
        >
          <h3
            data-slot="card-title"
            className="text-base font-semibold leading-none tracking-tight"
          >
            Activity
          </h3>
          <div className="flex items-center space-x-2.5">
            <label
              data-slot="label"
              className="text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50 font-medium text-sm"
              htmlFor="simple-switch"
            >
              Auto refresh:
            </label>
            Off
            <button
              type="button"
              role="switch"
              aria-checked="false"
              data-state="unchecked"
              value="on"
              data-slot="switch"
              className="relative peer inline-flex shrink-0 cursor-pointer items-center transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-input aria-invalid:border aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20 [[data-invalid=true]_&]:border [[data-invalid=true]_&]:border-destructive/60 [[data-invalid=true]_&]:ring-destructive/10 dark:[[data-invalid=true]_&]:border-destructive dark:[[data-invalid=true]_&]:ring-destructive/20 rounded-full h-5 w-8 data-[state=checked]:bg-primary ms-2"
              id="simple-switch"
            >
              <span
                data-state="unchecked"
                className="pointer-events-none block bg-white w-1/2 h-[calc(100%-4px)] shadow-lg ring-0 transition-transform start-0 data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[calc(100%-2px)] rtl:data-[state=unchecked]:-translate-x-[2px] rtl:data-[state=checked]:-translate-x-[calc(100%-2px)] rounded-full"
              />
            </button>
          </div>
        </div>
        <div data-slot="card-content" className="grow p-5">
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-square-dashed-bottom-code text-base"
                aria-hidden="true"
              >
                <path d="M10 9.5 8 12l2 2.5" />
                <path d="M14 21h1" />
                <path d="m14 9.5 2 2.5-2 2.5" />
                <path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2" />
                <path d="M9 21h1" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col pb-2.5">
                <span className="text-sm text-foreground">
                  Jenny attended a Nature Photography Immersion workshop
                </span>
                <span className="text-xs text-secondary-foreground">3 days ago, 11:45 AM</span>
              </div>
              <div
                data-slot="card"
                className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border black/5 shadow-none"
              >
                <div data-slot="card-content" className="grow p-5">
                  <div className="grid gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-5">
                      <div className="flex items-center gap-5 shrink-0">
                        <div className="border border-orange-200 rounded-lg  max-h-20">
                          <div className="flex items-center justify-center border-b border-b-orange-200 bg-orange-50 dark:border-orange-950 dark:bg-orange-950/30 rounded-t-lg">
                            <span className="text-sm text-orange-400 font-medium p-2">Apr</span>
                          </div>
                          <div className="flex items-center justify-center size-12">
                            <span className="font-medium text-foreground text-xl tracking-tight">
                              02
                            </span>
                          </div>
                        </div>
                        <img
                          className="rounded-lg max-h-20 max-w-full"
                          alt="image"
                          src="/metronic/tailwind/react/demo1/media/images/600x400/8.jpg"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <a
                          data-slot="button"
                          className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 [&_svg:not([class*=size-])]:size-4 h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent text-xs text-orange-400 leading-[14px] hover:text-primary-active mb-px"
                          href="/metronic/tailwind/react/demo1/public-profile/activity"
                          data-discover="true"
                        >
                          Nature Photography Immersion
                        </a>
                        <a
                          data-slot="button"
                          className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 [&_svg:not([class*=size-])]:size-4 h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent text-base font-medium hover:text-primary text-mono leading-4"
                          href="/metronic/tailwind/react/demo1/public-profile/activity"
                          data-discover="true"
                        >
                          Nature Photography Immersion
                        </a>
                        <p className="text-xs text-foreground leading-[22px]">
                          Enhance your nature photography skills in a hands-on workshop guided by
                          experienced photographers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-share2 lucide-share-2 text-base"
                aria-hidden="true"
              >
                <circle cx={18} cy={5} r={3} />
                <circle cx={6} cy={12} r={3} />
                <circle cx={18} cy={19} r={3} />
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  I couldn't resist sharing a sneak peek of our{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/blogger"
                    data-discover="true"
                  >
                    upcoming content
                  </a>
                </div>
                <span className="text-xs text-secondary-foreground">5 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-coffee text-base"
                aria-hidden="true"
              >
                <path d="M10 2v2" />
                <path d="M14 2v2" />
                <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
                <path d="M6 2v2" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-mono">
                  Reaching the milestone of{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/feeds"
                    data-discover="true"
                  >
                    10,000 followers
                  </a>{' '}
                  on the blog was a dream come true
                </div>
                <span className="text-xs text-secondary-foreground">5 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-rocket text-base"
                aria-hidden="true"
              >
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-mono">
                  Completed phase one of client project ahead of schedule.
                </div>
                <span className="text-xs text-secondary-foreground">6 days ago, 10:45 AM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-chart-spline text-base"
                aria-hidden="true"
              >
                <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  Onboarded a talented designer to our creative team, adding valuable expertise to
                  upcoming projects.
                </div>
                <span className="text-xs text-secondary-foreground">2 weeks ago, 10:45 AM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-badge-check text-base"
                aria-hidden="true"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-foreground">
                  Hosted a virtual{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/creator"
                    data-discover="true"
                  >
                    team-building event
                  </a>
                  , fostering collaboration and strengthening bonds among team members.
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  1 month ago, 13:56 PM
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-trophy text-base"
                aria-hidden="true"
              >
                <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
                <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
                <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
                <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
              </svg>
            </div>
            <div className="ps-2.5  text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  We recently{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/nft"
                    data-discover="true"
                  >
                    celebrated
                  </a>{' '}
                  the blog's 1-year anniversary
                </div>
                <span className="text-xs text-secondary-foreground">3 months ago, 4:07 PM</span>
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
            href="/metronic/tailwind/react/demo1/public-profile/activity"
            data-discover="true"
          >
            All-time Activity
          </a>
        </div>
      </div>
      <div
        data-slot="card"
        className="flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 grow hidden"
        id="activity_2020"
      >
        <div
          data-slot="card-header"
          className="flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5 border-b border-border"
        >
          <h3
            data-slot="card-title"
            className="text-base font-semibold leading-none tracking-tight"
          >
            Activity
          </h3>
          <div className="flex items-center space-x-2.5">
            <label
              data-slot="label"
              className="text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50 font-medium text-sm"
              htmlFor="simple-switch"
            >
              Auto refresh:
            </label>
            Off
            <button
              type="button"
              role="switch"
              aria-checked="false"
              data-state="unchecked"
              value="on"
              data-slot="switch"
              className="relative peer inline-flex shrink-0 cursor-pointer items-center transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-input aria-invalid:border aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20 [[data-invalid=true]_&]:border [[data-invalid=true]_&]:border-destructive/60 [[data-invalid=true]_&]:ring-destructive/10 dark:[[data-invalid=true]_&]:border-destructive dark:[[data-invalid=true]_&]:ring-destructive/20 rounded-full h-5 w-8 data-[state=checked]:bg-primary ms-2"
              id="simple-switch"
            >
              <span
                data-state="unchecked"
                className="pointer-events-none block bg-white w-1/2 h-[calc(100%-4px)] shadow-lg ring-0 transition-transform start-0 data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[calc(100%-2px)] rtl:data-[state=unchecked]:-translate-x-[2px] rtl:data-[state=checked]:-translate-x-[calc(100%-2px)] rounded-full"
              />
            </button>
          </div>
        </div>
        <div data-slot="card-content" className="grow p-5">
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-share2 lucide-share-2 text-base"
                aria-hidden="true"
              >
                <circle cx={18} cy={5} r={3} />
                <circle cx={6} cy={12} r={3} />
                <circle cx={18} cy={19} r={3} />
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  I couldn't resist sharing a sneak peek of our{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/blogger"
                    data-discover="true"
                  >
                    upcoming content
                  </a>
                </div>
                <span className="text-xs text-secondary-foreground">5 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-coffee text-base"
                aria-hidden="true"
              >
                <path d="M10 2v2" />
                <path d="M14 2v2" />
                <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
                <path d="M6 2v2" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-mono">
                  Reaching the milestone of{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/feeds"
                    data-discover="true"
                  >
                    10,000 followers
                  </a>{' '}
                  on the blog was a dream come true
                </div>
                <span className="text-xs text-secondary-foreground">5 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-chart-spline text-base"
                aria-hidden="true"
              >
                <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  Onboarded a talented designer to our creative team, adding valuable expertise to
                  upcoming projects.
                </div>
                <span className="text-xs text-secondary-foreground">2 weeks ago, 10:45 AM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-badge-check text-base"
                aria-hidden="true"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-foreground">
                  Hosted a virtual{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/creator"
                    data-discover="true"
                  >
                    team-building event
                  </a>
                  , fostering collaboration and strengthening bonds among team members.
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  1 month ago, 13:56 PM
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-trophy text-base"
                aria-hidden="true"
              >
                <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
                <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
                <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
                <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
              </svg>
            </div>
            <div className="ps-2.5  text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  We recently{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/nft"
                    data-discover="true"
                  >
                    celebrated
                  </a>{' '}
                  the blog's 1-year anniversary
                </div>
                <span className="text-xs text-secondary-foreground">3 months ago, 4:07 PM</span>
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
            href="/metronic/tailwind/react/demo1/public-profile/activity"
            data-discover="true"
          >
            All-time Activity
          </a>
        </div>
      </div>
      <div
        data-slot="card"
        className="flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 grow hidden"
        id="activity_2019"
      >
        <div
          data-slot="card-header"
          className="flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5 border-b border-border"
        >
          <h3
            data-slot="card-title"
            className="text-base font-semibold leading-none tracking-tight"
          >
            Activity
          </h3>
          <div className="flex items-center space-x-2.5">
            <label
              data-slot="label"
              className="text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50 font-medium text-sm"
              htmlFor="simple-switch"
            >
              Auto refresh:
            </label>
            Off
            <button
              type="button"
              role="switch"
              aria-checked="false"
              data-state="unchecked"
              value="on"
              data-slot="switch"
              className="relative peer inline-flex shrink-0 cursor-pointer items-center transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-input aria-invalid:border aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20 [[data-invalid=true]_&]:border [[data-invalid=true]_&]:border-destructive/60 [[data-invalid=true]_&]:ring-destructive/10 dark:[[data-invalid=true]_&]:border-destructive dark:[[data-invalid=true]_&]:ring-destructive/20 rounded-full h-5 w-8 data-[state=checked]:bg-primary ms-2"
              id="simple-switch"
            >
              <span
                data-state="unchecked"
                className="pointer-events-none block bg-white w-1/2 h-[calc(100%-4px)] shadow-lg ring-0 transition-transform start-0 data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[calc(100%-2px)] rtl:data-[state=unchecked]:-translate-x-[2px] rtl:data-[state=checked]:-translate-x-[calc(100%-2px)] rounded-full"
              />
            </button>
          </div>
        </div>
        <div data-slot="card-content" className="grow p-5">
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-share2 lucide-share-2 text-base"
                aria-hidden="true"
              >
                <circle cx={18} cy={5} r={3} />
                <circle cx={6} cy={12} r={3} />
                <circle cx={18} cy={19} r={3} />
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  I couldn't resist sharing a sneak peek of our{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/blogger"
                    data-discover="true"
                  >
                    upcoming content
                  </a>
                </div>
                <span className="text-xs text-secondary-foreground">5 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-calendar-check2 lucide-calendar-check-2 text-base"
                aria-hidden="true"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
                <path d="M3 10h18" />
                <path d="m16 20 2 2 4-4" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col pb-2.5">
                <span className="text-sm text-foreground">
                  Jenny attended a webinar on new product features.
                </span>
                <span className="text-xs text-secondary-foreground">3 days ago, 11:45 AM</span>
              </div>
              <div
                data-slot="card"
                className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border black/5 shadow-none p-4"
              >
                <div className="flex flex-wrap gap-2.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-square-dashed-bottom-code text-lg text-violet-500"
                    aria-hidden="true"
                  >
                    <path d="M10 9.5 8 12l2 2.5" />
                    <path d="M14 21h1" />
                    <path d="m14 9.5 2 2.5-2 2.5" />
                    <path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2" />
                    <path d="M9 21h1" />
                  </svg>
                  <div className="flex flex-col gap-5 grow">
                    <div className="flex flex-wrap items-center justify-between">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-base font-medium text-mono cursor-pointer hover:text-primary mb-px">
                          Leadership Development Series: Part 1
                        </span>
                        <span className="text-xs text-secondary-foreground">
                          The first installment of a leadership development series.
                        </span>
                      </div>
                      <button
                        data-slot="button"
                        className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent font-medium text-primary hover:text-primary/90 [&_svg]:opacity-60 underline underline-offset-4 decoration-dashed decoration-1"
                      >
                        <a
                          href="/metronic/tailwind/react/demo1/account/members/teams"
                          data-discover="true"
                        >
                          View
                        </a>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-7.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-secondary-foreground">Code:</span>
                        <span className="text-sm text-primary">#leaderdev-1</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-secondary-foreground">Progress:</span>
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
                            className="h-full w-full flex-1 transition-all bg-green-500 min-w-[120px]"
                            style={{ transform: 'translateX(-20%)' }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 lg:min-w-24 shrink-0 max-w-auto">
                        <span className="text-sm text-secondary-foreground">Guests:</span>
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
                              +24
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-coffee text-base"
                aria-hidden="true"
              >
                <path d="M10 2v2" />
                <path d="M14 2v2" />
                <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
                <path d="M6 2v2" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-mono">
                  Reaching the milestone of{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/feeds"
                    data-discover="true"
                  >
                    10,000 followers
                  </a>{' '}
                  on the blog was a dream come true
                </div>
                <span className="text-xs text-secondary-foreground">5 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-chart-spline text-base"
                aria-hidden="true"
              >
                <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  Onboarded a talented designer to our creative team, adding valuable expertise to
                  upcoming projects.
                </div>
                <span className="text-xs text-secondary-foreground">2 weeks ago, 10:45 AM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-badge-check text-base"
                aria-hidden="true"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-foreground">
                  Hosted a virtual{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/creator"
                    data-discover="true"
                  >
                    team-building event
                  </a>
                  , fostering collaboration and strengthening bonds among team members.
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  1 month ago, 13:56 PM
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-trophy text-base"
                aria-hidden="true"
              >
                <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
                <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
                <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
                <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
              </svg>
            </div>
            <div className="ps-2.5  text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  We recently{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/nft"
                    data-discover="true"
                  >
                    celebrated
                  </a>{' '}
                  the blog's 1-year anniversary
                </div>
                <span className="text-xs text-secondary-foreground">3 months ago, 4:07 PM</span>
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
            href="/metronic/tailwind/react/demo1/public-profile/activity"
            data-discover="true"
          >
            All-time Activity
          </a>
        </div>
      </div>
      <div
        data-slot="card"
        className="flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 grow hidden"
        id="activity_2018"
      >
        <div
          data-slot="card-header"
          className="flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5 border-b border-border"
        >
          <h3
            data-slot="card-title"
            className="text-base font-semibold leading-none tracking-tight"
          >
            Activity
          </h3>
          <div className="flex items-center space-x-2.5">
            <label
              data-slot="label"
              className="text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50 font-medium text-sm"
              htmlFor="simple-switch"
            >
              Auto refresh:
            </label>
            Off
            <button
              type="button"
              role="switch"
              aria-checked="false"
              data-state="unchecked"
              value="on"
              data-slot="switch"
              className="relative peer inline-flex shrink-0 cursor-pointer items-center transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-input aria-invalid:border aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20 [[data-invalid=true]_&]:border [[data-invalid=true]_&]:border-destructive/60 [[data-invalid=true]_&]:ring-destructive/10 dark:[[data-invalid=true]_&]:border-destructive dark:[[data-invalid=true]_&]:ring-destructive/20 rounded-full h-5 w-8 data-[state=checked]:bg-primary ms-2"
              id="simple-switch"
            >
              <span
                data-state="unchecked"
                className="pointer-events-none block bg-white w-1/2 h-[calc(100%-4px)] shadow-lg ring-0 transition-transform start-0 data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[calc(100%-2px)] rtl:data-[state=unchecked]:-translate-x-[2px] rtl:data-[state=checked]:-translate-x-[calc(100%-2px)] rounded-full"
              />
            </button>
          </div>
        </div>
        <div data-slot="card-content" className="grow p-5">
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-share2 lucide-share-2 text-base"
                aria-hidden="true"
              >
                <circle cx={18} cy={5} r={3} />
                <circle cx={6} cy={12} r={3} />
                <circle cx={18} cy={19} r={3} />
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  I couldn't resist sharing a sneak peek of our{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/blogger"
                    data-discover="true"
                  >
                    upcoming content
                  </a>
                </div>
                <span className="text-xs text-secondary-foreground">5 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-coffee text-base"
                aria-hidden="true"
              >
                <path d="M10 2v2" />
                <path d="M14 2v2" />
                <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
                <path d="M6 2v2" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-mono">
                  Reaching the milestone of{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/feeds"
                    data-discover="true"
                  >
                    10,000 followers
                  </a>{' '}
                  on the blog was a dream come true
                </div>
                <span className="text-xs text-secondary-foreground">5 days ago, 4:07 PM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-printer text-base"
                aria-hidden="true"
              >
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
                <rect x={6} y={14} width={12} height={8} rx={1} />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col pb-2.5">
                <span className="text-sm text-foreground">
                  Attending the virtual blogging conference was an enriching experience
                </span>
                <span className="text-xs text-secondary-foreground">2 days ago, 4:07 PM</span>
              </div>
              <div
                data-slot="card"
                className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border black/5 shadow-none"
              >
                <div data-slot="card-content" className="grow p-5 lg:py-4">
                  <div className="flex justify-center py-4">
                    <img
                      className="dark:hidden max-h-[160px]"
                      alt="image"
                      src="/metronic/tailwind/react/demo1/media/illustrations/3.svg"
                    />
                    <img
                      className="light:hidden max-h-[160px]"
                      alt="image"
                      src="/metronic/tailwind/react/demo1/media/illustrations/3-dark.svg"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-base font-medium text-mono text-center">
                      Blogging Conference
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <a
                        data-slot="button"
                        className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                        href="/metronic/tailwind/react/demo1/public-profile/profiles/company"
                        data-discover="true"
                      >
                        Axio new release
                      </a>
                      <span className="text-sm text-secondary-foreground me-2">email campaign</span>
                      <span
                        data-slot="badge"
                        className="inline-flex items-center justify-center border border-transparent font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5 text-[var(--color-success-accent,var(--color-green-800))] bg-[var(--color-success-soft,var(--color-green-100))] dark:bg-[var(--color-success-soft,var(--color-green-950))] dark:text-[var(--color-success-soft,var(--color-green-600))]"
                      >
                        Public
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input" />
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-chart-spline text-base"
                aria-hidden="true"
              >
                <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  Onboarded a talented designer to our creative team, adding valuable expertise to
                  upcoming projects.
                </div>
                <span className="text-xs text-secondary-foreground">2 weeks ago, 10:45 AM</span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-badge-check text-base"
                aria-hidden="true"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="ps-2.5 mb-7 text-base grow">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-foreground">
                  Hosted a virtual{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/creator"
                    data-discover="true"
                  >
                    team-building event
                  </a>
                  , fostering collaboration and strengthening bonds among team members.
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  1 month ago, 13:56 PM
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start relative">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
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
                className="lucide lucide-trophy text-base"
                aria-hidden="true"
              >
                <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
                <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
                <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
                <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
              </svg>
            </div>
            <div className="ps-2.5  text-base grow">
              <div className="flex flex-col">
                <div className="text-sm text-foreground">
                  We recently{' '}
                  <a
                    data-slot="button"
                    className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 text-primary h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent"
                    href="/metronic/tailwind/react/demo1/public-profile/profiles/nft"
                    data-discover="true"
                  >
                    celebrated
                  </a>{' '}
                  the blog's 1-year anniversary
                </div>
                <span className="text-xs text-secondary-foreground">3 months ago, 4:07 PM</span>
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
            href="/metronic/tailwind/react/demo1/public-profile/activity"
            data-discover="true"
          >
            All-time Activity
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <button
          data-slot="button"
          className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 h-7 rounded-md px-2.5 text-xs [&_svg:not([class*=size-])]:size-3.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-transparent text-primary/90 hover:bg-primary/5 data-[state=open]:bg-primary/5 justify-start gap-1"
        >
          2025
        </button>
        <button
          data-slot="button"
          className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 text-muted-foreground hover:text-foreground data-[state=open]:text-foreground h-7 rounded-md px-2.5 text-xs [&_svg:not([class*=size-])]:size-3.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 justify-start gap-1"
        >
          2024
        </button>
        <button
          data-slot="button"
          className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 text-muted-foreground hover:text-foreground data-[state=open]:text-foreground h-7 rounded-md px-2.5 text-xs [&_svg:not([class*=size-])]:size-3.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 justify-start gap-1"
        >
          2023
        </button>
        <button
          data-slot="button"
          className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 text-muted-foreground hover:text-foreground data-[state=open]:text-foreground h-7 rounded-md px-2.5 text-xs [&_svg:not([class*=size-])]:size-3.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 justify-start gap-1"
        >
          2022
        </button>
        <button
          data-slot="button"
          className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 text-muted-foreground hover:text-foreground data-[state=open]:text-foreground h-7 rounded-md px-2.5 text-xs [&_svg:not([class*=size-])]:size-3.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 justify-start gap-1"
        >
          2021
        </button>
        <button
          data-slot="button"
          className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 text-muted-foreground hover:text-foreground data-[state=open]:text-foreground h-7 rounded-md px-2.5 text-xs [&_svg:not([class*=size-])]:size-3.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 justify-start gap-1"
        >
          2020
        </button>
        <button
          data-slot="button"
          className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 text-muted-foreground hover:text-foreground data-[state=open]:text-foreground h-7 rounded-md px-2.5 text-xs [&_svg:not([class*=size-])]:size-3.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 justify-start gap-1"
        >
          2019
        </button>
        <button
          data-slot="button"
          className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 text-muted-foreground hover:text-foreground data-[state=open]:text-foreground h-7 rounded-md px-2.5 text-xs [&_svg:not([class*=size-])]:size-3.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 justify-start gap-1"
        >
          2018
        </button>
      </div>
    </div>
  );
};

export default ActivityTab;
