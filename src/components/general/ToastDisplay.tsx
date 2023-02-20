import React from "react"
import { toast, Toaster, Toast, ToastBar } from "react-hot-toast"

export default function ToastDisplay() {
  return (
    <Toaster position="top-right">
      {(t: Toast) => (
        <ToastBar toast={t}>
          {({ message }) => (
            <div className="py-[27.5px]  w-[312px] rounded-2xl px-[15px] bg-[#E6F5ED]">
              <button
                type="button"
                className="absolute top-3 right-3"
                onClick={() => toast.dismiss(t.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.71 5.23L10.46 8.98L8.98 10.46L5.23 6.71L1.48 10.46L0 8.98L3.75 5.23L0 1.48L1.48 0L5.23 3.75L8.98 0L10.46 1.48L6.71 5.23Z"
                    fill="#07BC0C"
                  />
                </svg>
              </button>
              <div className="flex items-center space-x-[10px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433286 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9969 7.34878 18.9424 4.80704 17.0677 2.93234C15.193 1.05765 12.6512 0.00308769 10 0ZM15.7725 6.83333L10.0683 14.5742C10.001 14.6635 9.91653 14.7386 9.81987 14.7949C9.72321 14.8513 9.61629 14.8878 9.50536 14.9024C9.39442 14.917 9.2817 14.9093 9.17376 14.8799C9.06581 14.8504 8.96482 14.7997 8.87667 14.7308L4.80334 11.4742C4.71787 11.4058 4.64671 11.3212 4.59392 11.2253C4.54113 11.1294 4.50775 11.0241 4.49568 10.9153C4.4713 10.6955 4.5352 10.4751 4.67334 10.3025C4.81147 10.1299 5.01252 10.0192 5.23225 9.99484C5.34105 9.98277 5.45116 9.99224 5.5563 10.0227C5.66143 10.0532 5.75954 10.1041 5.845 10.1725L9.24167 12.89L14.4308 5.8475C14.4933 5.75376 14.5741 5.67365 14.6684 5.61203C14.7627 5.5504 14.8686 5.50854 14.9795 5.48897C15.0904 5.46939 15.2042 5.47251 15.3139 5.49814C15.4236 5.52377 15.527 5.57138 15.6177 5.63808C15.7085 5.70479 15.7848 5.7892 15.8421 5.88623C15.8993 5.98326 15.9363 6.09089 15.9507 6.20261C15.9652 6.31433 15.9569 6.42782 15.9262 6.53623C15.8956 6.64464 15.8433 6.74571 15.7725 6.83333Z"
                    fill="#07BC0C"
                  />
                </svg>
                <p className="text-base max-w-[229.68px] text-[#0F172A]/[.8]">
                  {message}
                </p>
              </div>
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  )
}
