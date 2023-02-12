import React from "react"
import { ReactComponent as Trash } from "../../assets/icons/trash.svg"
import { ReactComponent as LinkIcon } from "../../assets/icons/link.svg"
import { importedTokens } from "../../dummy/user-tokens"

export default function CustomTokens() {
  return (
    <div className="px-6 pt-[9px]">
      {importedTokens.length === 0 ? (
        <div className="pt-[81px] pb-[139px]">
          <p className="italic text-lightBlue text-center">
            No custom tokens found
          </p>
        </div>
      ) : (
        <div>
          <p className="font-medium text-black mb-[32.5px]">
            {importedTokens.length} Imported Tokens
          </p>
          <ul className="pb-[19.5px]">
            {importedTokens.map((token) => (
              <li key={token.token}>
                <div className="mb-[19.5px] flex justify-between">
                  <div className="flex space-x-2 items-center">
                    <img
                      src={token.icon}
                      alt={token.token}
                      className="h-7 w-7"
                    />
                    <div className="flex flex-col space-y-[2.5px]">
                      <h3 className="text-black text-sm font-semibold">
                        {token.token}
                      </h3>
                      <div className="flex space-x-[6.62px] items-center">
                        <img
                          src={token.source_icon}
                          alt={token.source}
                          className="h-[8.75px] w-[8.75px]"
                        />
                        <p className="text-[10px] text-lightBlue leading-3">
                          {token.source}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center space-x-[18.67px]">
                    <button type="button">
                      <Trash />
                    </button>
                    <button type="button">
                      <LinkIcon className="stroke-primary" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
