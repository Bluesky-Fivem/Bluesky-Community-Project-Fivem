import { For } from "solid-js"

export const InterfaceView = (props: any) => {
    return (
        <div class={`center-column center ${!!(props.progressBar().length <= 0) && 'hidden'}`}>
            <div class={`progress-cont`}>
                <For 
                    each={props.progressBar()}
                >
                    {(progress: any) => {
                        return (
                            <div class={`progress ${!!(progress.percent >= 100) && 'removeAnim'}`}>
                                <div class="top-line">
                                    <p class="gilroy600 p-white">
                                        {progress.title}
                                    </p>
                                    <p class="gilroy400 p-white">
                                        {progress.percent}%
                                    </p>
                                </div>
                                <div class="bottom-line">
                                    <ul class="center">
                                        <For 
                                            each={progress.prog}
                                        >
                                            {(item: any) => (
                                                <li class={`center ${!!item && 'active'}`}>
                                                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0 0H8L10.5 4L8 8H0L2.5 4L0 0Z" fill="url(#paint0_linear_192_180)"></path>
                                                        <defs>
                                                            <linearGradient id="paint0_linear_192_180" x1="8" y1="3.99996" x2="-4.38265e-10" y2="3.99996" gradientUnits="userSpaceOnUse">
                                                                <stop stop-color="#00F8B9"></stop>
                                                                <stop offset="1" stop-color="#129070"></stop>
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </li>
                                            )}
                                        </For>
                                    </ul>
                                </div>
                            </div>
                        )
                    }} 
                </For>
            </div>
        </div>
    )
}