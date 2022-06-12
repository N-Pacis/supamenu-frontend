import React, { useEffect, useState } from "react";
import "../styles/table.css";
import "../styles/checkout.css";
import TablePagination from "../components/Table/TablePagination";
import { FaDownload } from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import { fetchOrders } from "../actions/orderAction";
import { useSelector } from "react-redux";
import authHeader from "../services/auth-header";
import axios from 'axios';
import { formatDate, formatTime } from "../utils/format";
import { saveAs } from 'file-saver'

export default function ClientOrders({ }) {
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState(0)
    const { user } = useSelector((state) => state.auth);

    const changePage = async (newPage) => {
        if (newPage !== orders.number) {
            setLoading(true)
            let ordersData = await fetchOrders(newPage, user?.id);
            setOrders(ordersData)
            setCurrentPage(ordersData?.number + 1)
            setPages(ordersData?.totalPages)
            setLoading(false)
        }
    };

    useEffect(async () => {
        setLoading(true)
        let ordersData = await fetchOrders(0, user?.id)
        setOrders(ordersData)
        setCurrentPage(ordersData?.number + 1)
        setPages(ordersData?.totalPages)
        setLoading(false)
    }, [])


    const handleStatusClassnames = (status) => {
        switch (status) {
            case 'ORDERING':
                return 'payment-pending'
            case 'PLACED':
                return 'placed'
            case 'DELIVERED':
                return 'order-success'
            case 'CANCELLED':
                return 'order-failed';
            case 'FAILED':
                return 'order-failed';
            case 'RECEIVED':
                return 'order-success';
            case 'READY':
                return 'order-success';
            default:
                return ''
        }
    }
    const handleNames = (status) => {
        switch (status) {
            case 'ORDERING':
                return 'Payment Pending'
            case 'PLACED':
                return 'Placed'
            case 'DELIVERED':
                return 'Delivered'
            case 'CANCELLED':
                return 'Cancelled';
            case 'FAILED':
                return 'Failed';
            case 'RECEIVED':
                return 'Received';
            case 'READY':
                return 'Ready';
            default:
                return status
        }
    }

    return (

        <>
            <div className="app-top-banner-payment">
                <Navbar />
            </div>
            <h2 className="orders-heading">My Orders</h2>
            {renderTable({
                tableData: orders.content,
                loading,
                handleStatusClassnames,
                handleNames
            })}
            <TablePagination
                pages={pages}
                active={currentPage}
                changePage={changePage}
                loading={loading}
            >

            </TablePagination>
            <div className="h-10"></div>
        </>
    )
}


const renderTable = ({
    tableData = [],
    loading,
    handleStatusClassnames,
    handleNames
}) => {



    return (
        <div
            style={{ overflowX: "auto", minHeight: "20rem" }}
            className="sm-transfers-table-container"
        >
            <table className="sm-transfers-table mt-8">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Products</th>
                        <th>Price</th>
                        <th>Restaurant</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Seat</th>
                        <th>Type</th>
                        <th>Payment Method</th>
                        <th>Download</th>
                    </tr>
                </thead>

                <tbody>
                    {!loading &&
                        tableData.map((tr, index) => (
                            <React.Fragment key={tr.id}>
                                <tr className="space"></tr>
                                <tr key={index}>
                                    <td>{tr?.id}</td>
                                    <td className="text-center">{tr?.numberOfProducts}</td>
                                    <td className="text-center">{tr?.totalOrderPrice} RWF</td>
                                    <td>{tr?.serviceProvider?.name}</td>
                                    <td className={`text-center ${handleStatusClassnames(tr.status)}`}>{handleNames(tr.status)}</td>
                                    <td>{formatDate(tr?.createdAt)}</td>
                                    <td>{formatTime(tr?.createdAt)}</td>
                                    <td className="text-center">{tr.seat ? tr.seat : "N/A"}</td>
                                    <td className="text-center">{tr?.orderType}</td>
                                    <td className="text-center">{tr.paymentMethod ? tr.paymentMethod : "N/A"}</td>
                                    {
                                        (tr.status == 'PLACED' || tr.status == 'PACKAGING' || tr.status == 'SHIPPING' || tr.status == 'DELIVERED' || tr.status == "RECEIVED") ? (
                                            <td className="text-center">
                                                <a href={`https://backend.supamenu.rw/supamenu/api/invoices/order/281`} target="_blank">
                                                    <FaDownload
                                                        className="ml-5 cursor-pointer"
                                                        style={{ fontSize: "17px", color: "#949996" }}
                                                    />
                                                </a>
                                            </td>
                                        )
                                            :
                                            <td className="text-center">
                                                N/A
                                            </td>
                                    }

                                </tr>
                            </React.Fragment>
                        ))}
                </tbody>
            </table>
            {(loading || tableData.length === 0) && (
                <p
                    className="mt-6 text-base"
                    style={{
                        color: "#868585",
                    }}
                >
                    {loading ? "Loading..." : "No results Found"}
                </p>
            )}
        </div>

    )
};