import { useWeb3Contract, useMoralis } from "react-moralis"
import { abi, contractAddresses } from "../constants/index.js"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Check, useNotification } from "web3uikit"

export default function Interface() {
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const chairLendAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [userDeposits, setUserDeposits] = useState("0")
    const [userBorrows, setUserBorrows] = useState("0")
    const [enteredDeposits, setEnteredDeposits] = useState("")
    const [enteredBorrows, setEnteredBorrows] = useState("")
    const [enteredRepays, setEnteredRepays] = useState("")
    const [sendedDeposits, setSendedDeposits] = useState("")
    const [sendedBorrows, setSendedBorrows] = useState("")
    const [sendedRepays, setSendedRepays] = useState("")
    const dispatch = useNotification()
    const handleNewNotification = function () {
        dispatch({
            type: "succes",
            message: "Transaction complete",
            title: "Tx Notification",
            position: "topR",
        })
    }
    const handleBrorrowErrorNotification = function () {
        dispatch({
            type: "error",
            message: "Try to reduce your borrow or add more deposits",
            title: "Transaction failed",
            position: "topR",
        })
    }
    const handleRepayErrorNotification = function () {
        dispatch({
            type: "error",
            message: "Try to reduce your repay value",
            title: "Transaction failed",
            position: "topR",
        })
    }

    const handleWithdrawErrorNotification = function () {
        dispatch({
            type: "error",
            message: "You dont have any deposits",
            title: "Transaction failed",
            position: "topR",
        })
    }
    const handleSuccees = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUIValues()
    }

    const {
        runContractFunction: getUserDeposits,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: chairLendAddress,
        functionName: "getUserDeposits",
        params: { _user: account },
    })

    const { runContractFunction: getUserBorrows } = useWeb3Contract({
        abi: abi,
        contractAddress: chairLendAddress,
        functionName: "getUserBorrows",
        params: { _user: account },
    })
    const { runContractFunction: deposit } = useWeb3Contract({
        abi: abi,
        contractAddress: chairLendAddress,
        functionName: "deposit",
        msgValue: sendedDeposits,
    })

    const { runContractFunction: borrow } = useWeb3Contract({
        abi: abi,
        contractAddress: chairLendAddress,
        functionName: "borrow",
        params: { _amount: sendedBorrows },
    })

    const { runContractFunction: rePay } = useWeb3Contract({
        abi: abi,
        contractAddress: chairLendAddress,
        functionName: "rePay",
        params: { _amount: sendedRepays },
    })

    const { runContractFunction: withdraw } = useWeb3Contract({
        abi: abi,
        contractAddress: chairLendAddress,
        functionName: "withdraw",
        params: {},
    })

    async function updateUIValues() {
        console.log("Updating values....")
        const userDepositsFromCall = (await getUserDeposits()).toString()
        const userBorrowsFromCall = (await getUserBorrows()).toString()
        setUserBorrows(userBorrowsFromCall)
        setUserDeposits(userDepositsFromCall)
    }
    useEffect(() => {
        console.log("Checking web3Enabled...")
        if (isWeb3Enabled) {
            updateUIValues()
        } else {
            console.log("Web3 isn't enabled")
        }
    }, [isWeb3Enabled])

    return (
        <div>
            {chairLendAddress ? (
                <div className="container px-4 py-5" id="hanging-icons">
                    <h2 className="fs-1">Get $ChairCoin borrows</h2>
                    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                        <div className="col d-flex align-items-start">
                            <div className="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
                            <div>
                                <h3 className="fs-2">Deposit</h3>
                                <div>
                                    Current Deposits:
                                    {ethers.utils.formatUnits(
                                        userDeposits,
                                        "ether"
                                    )}
                                </div>
                                <input
                                    className="form-control"
                                    placeholder="Deposit amount"
                                    type="number"
                                    min="0"
                                    value={enteredDeposits}
                                    onInput={(e) => {
                                        setEnteredDeposits(e.target.value)
                                        const sendedValue = ethers.utils
                                            .parseEther(e.target.value)
                                            .toString()
                                        setSendedDeposits(sendedValue)
                                    }}
                                />
                                <button
                                    className="btn btn-primary mt-2"
                                    onClick={async function () {
                                        await deposit({
                                            onSuccess: handleSuccees,
                                            onError: (error) =>
                                                console.log(error),
                                        })
                                    }}
                                    disabled={isLoading || isFetching}
                                >
                                    {isLoading || isFetching ? (
                                        <div
                                            className="spinner-border"
                                            role="status"
                                        ></div>
                                    ) : (
                                        <div>Deposit</div>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="col d-flex align-items-start">
                            <div className="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
                            <div>
                                <h3 className="fs-2">Borrow</h3>
                                <div>
                                    Current Borrows:
                                    {ethers.utils.formatUnits(
                                        userBorrows,
                                        "ether"
                                    )}
                                </div>
                                <input
                                    className="form-control"
                                    placeholder="Borrow amount"
                                    type="number"
                                    min="0"
                                    value={enteredBorrows}
                                    onInput={(e) => {
                                        setEnteredBorrows(e.target.value)
                                        const sendedValue = ethers.utils
                                            .parseEther(e.target.value)
                                            .toString()
                                        setSendedBorrows(sendedValue)
                                    }}
                                />
                                <button
                                    className="btn btn-primary mt-2"
                                    type="submit"
                                    value="Submit"
                                    onClick={async function () {
                                        await borrow({
                                            onSuccess: handleSuccees,
                                            onError:
                                                handleBrorrowErrorNotification,
                                        })
                                    }}
                                >
                                    {isLoading || isFetching ? (
                                        <div
                                            class="spinner-border"
                                            role="status"
                                        ></div>
                                    ) : (
                                        <div>Borrow</div>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="col d-flex align-items-start">
                            <div className="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
                            <div>
                                <div>
                                    <h3 className="fs-2">Repay</h3>
                                    <input
                                        className="form-control"
                                        placeholder="Repay amount"
                                        type="number"
                                        min="0"
                                        value={enteredRepays}
                                        onInput={(e) => {
                                            setEnteredRepays(e.target.value)
                                            const sendedValue = ethers.utils
                                                .parseEther(e.target.value)
                                                .toString()
                                            setSendedRepays(sendedValue)
                                        }}
                                    />
                                    <button
                                        className="btn btn-primary mt-2"
                                        type="submit"
                                        value="Submit"
                                        onClick={async function () {
                                            await rePay({
                                                onSuccess: handleSuccees,
                                                onError:
                                                    handleRepayErrorNotification,
                                            })
                                        }}
                                    >
                                        {isLoading || isFetching ? (
                                            <div
                                                class="spinner-border"
                                                role="status"
                                            ></div>
                                        ) : (
                                            <div>Repay</div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col d-flex align-items-start">
                            <div className="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
                            <div>
                                <div>
                                    <h3 className="fs-2">Withdraw</h3>
                                    <button
                                        className="btn btn-primary mt-2"
                                        type="submit"
                                        value="Submit"
                                        onClick={async function () {
                                            await withdraw({
                                                onSuccess: handleSuccees,
                                                onError:
                                                    handleWithdrawErrorNotification,
                                            })
                                        }}
                                    >
                                        {isLoading || isFetching ? (
                                            <div
                                                className="spinner-border"
                                                role="status"
                                            ></div>
                                        ) : (
                                            <div>Withdraw</div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div class="px-4 py-5 my-5 text-center">
                    <img
                        class="d-block mx-auto mb-4"
                        width="100"
                        height="100"
                        src="/error.png"
                    />
                    <h1 class="display-5 fw-bold">Network error</h1>
                    <div class="col-lg-6 mx-auto">
                        <p class="lead mb-4">
                            This blockchain network is not suppporte yet, please
                            switch to some of the supported networks "Mumbai
                            testnet", "Polygon"
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}