import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const RecentlyAddeddProducts = () => {
    const navigate = useNavigate();
    const [item, setItem] = useState([]);
   

    const loadProducts = async() => {
        try {
            const response = await axios.get("/api/products");

                setItem(response?.data?.content);
                console.log(response?.data?.content);
            
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
      loadProducts();
      console.log(loadProducts)
    }, []);

   
  

    return (
        <Card>
            <CardHeader
                title='Recently Added Products'
                sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
                action={<Typography onClick={() => navigate("/admin/products")} variant='caption' sx={{ color: "blue", cursor: "pointer", paddingRight: ".8rem" }}>View All</Typography>}
                titleTypographyProps={{
                    variant: 'h5',
                    sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
                }}
            />
            <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                    item?.map((item)=>{
                           
                                <TableRow hover key={item.title} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                    <TableCell> <Avatar alt={item.title} src={item.imageUrl} /> </TableCell>
                                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{item.title}</Typography>
                                            <Typography variant='caption'>{item.brand}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{"dress"}</TableCell>
                                    <TableCell>{item.discountedPrice}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                </TableRow>
                            
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
}

export default RecentlyAddeddProducts;

// import {
//   Avatar,
//   AvatarGroup,
//   Box,
//   Button,
//   Card,
//   CardHeader,
//   Chip,
//   FormControl,
//   InputLabel,
//   Menu,
//   MenuItem,
//   Pagination,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";

// import React, { useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";
// import { Grid, Select } from "@mui/material";

// import { useDispatch, useSelector } from "react-redux";
// import {
//   confirmOrder,
//   deleteOrder,
//   deliveredOrder,
//   getOrders,
//   shipOrder,
// } from "./../../Redux/Admin/Orders/Action";
// import { configure } from "@testing-library/react";

// const OrdersTable = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ status: "", sort: "" });
//   const [orderStatus, setOrderStatus] = useState("");
//   const dispatch = useDispatch();
//   const jwt = localStorage.getItem("jwt");
//   const { adminsOrder } = useSelector((store) => store);
//   const [anchorElArray, setAnchorElArray] = useState([]);

//   useEffect(() => {
//     dispatch(getOrders({ jwt }));
//   }, [jwt, adminsOrder.delivered, adminsOrder.shipped, adminsOrder.confirmed]);

//   // useEffect(()=>{
//   //   dispatch(getOrders({jwt}))
//   // },[])

//   const handleUpdateStatusMenuClick = (event, index) => {
//     const newAnchorElArray = [...anchorElArray];
//     newAnchorElArray[index] = event.currentTarget;
//     setAnchorElArray(newAnchorElArray);
//   };

//   const handleUpdateStatusMenuClose = (index) => {
//     const newAnchorElArray = [...anchorElArray];
//     newAnchorElArray[index] = null;
//     setAnchorElArray(newAnchorElArray);
//   };

//   const handleChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;

//     setFormData({ ...formData, [name]: value });
//   };
//   function handlePaginationChange(event, value) {
//     console.log("Current page:", value);
//   }

//   const handleConfirmedOrder = (orderId, index) => {
//     handleUpdateStatusMenuClose(index);
//     dispatch(confirmOrder(orderId));
//     setOrderStatus("CONFIRMED");
//   };

//   const handleShippedOrder = (orderId, index) => {
//     handleUpdateStatusMenuClose(index);
//     dispatch(shipOrder(orderId));
//     setOrderStatus("ShIPPED");
//   };

//   const handleDeliveredOrder = (orderId, index) => {
//     handleUpdateStatusMenuClose(index);
//     dispatch(deliveredOrder(orderId));
//     setOrderStatus("DELIVERED");
//   };

//   const handleDeleteOrder = (orderId) => {
//     handleUpdateStatusMenuClose();
//     dispatch(deleteOrder(orderId));
//   };

//   // const orderDetails = (orderName) =>{
//   //   handleUpdateStatusMenuClick();
//   //   dispatch(orderDetails(orderName))  
//   // }
 
//   //   useEffect(()=>{
//   // setUpdateOrderStatus(item.orderStatus==="PENDING"?"PENDING": item.orderStatus==="PLACED"?"CONFIRMED":item.orderStatus==="CONFIRMED"?"SHIPPED":"DELEVERED")
//   //   },[adminsOrder.orders])

//   return (
//     <Box>
     
//       <Card className="mt-2">
//         <CardHeader
//           title="Recently Added Products"
//           sx={{
//             pt: 2,
//             alignItems: "center",
//             "& .MuiCardHeader-action": { mt: 0.6 },
//           }}
//         />
//         <TableContainer>
//           <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Image</TableCell>
//                 <TableCell>Title</TableCell>

//                 <TableCell>Price</TableCell>
//                 <TableCell>Id</TableCell>
//                 <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
//                 <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
//                 <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {adminsOrder?.orders?.map((item, index) => (
//                 <TableRow
//                   hover
//                   key={item.name}
//                   sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
//                 >
//                   <TableCell sx={{}}>
//                     <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
//                       {item.orderItems.map((orderItem) => (
//                         <Avatar
//                           alt={item.title}
//                           src={orderItem.product?.imageUrl}
//                         />
//                       ))}
//                     </AvatarGroup>{" "}
//                   </TableCell>

//                   <TableCell
//                     sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
//                   >
//                     <Box sx={{ display: "flex", flexDirection: "column" }}>
//                       <Typography
//                         sx={{
//                           fontWeight: 500,
//                           fontSize: "0.875rem !important",
//                         }}
//                       >
//                         {item?.orderItems.map((order) => (
//                           <span className=""> {order.product?.title},</span>
//                         ))}
//                       </Typography>
//                       <Typography variant="caption">
//                         {item?.orderItems.map((order) => (
//                           <span className="opacity-60">
//                             {" "}
//                             {order.product?.brand},
//                           </span>
//                         ))}
//                       </Typography>
//                     </Box>
//                   </TableCell>

//                   <TableCell>{item?.totalPrice}</TableCell>
//                   <TableCell>{item?._id}</TableCell>
//                   <TableCell className="text-white">
//                     <Chip
//                       sx={{
//                         color: "white !important",
//                         fontWeight: "bold",
//                         textAlign: "center",
//                       }}
//                       label={item?.orderStatus}
//                       size="small"
//                       color={
//                         item.orderStatus === "PENDING"
//                           ? "info"
//                           : item?.orderStatus === "DELIVERED"
//                           ? "success"
//                           : "secondary"
//                       }
//                       className="text-white"
//                     />
//                   </TableCell>
//                   <TableCell
//                     sx={{ textAlign: "center" }}
//                     className="text-white"
//                   >
//                     {/* <Button>{item.orderStatus==="PENDING"?"PENDING": item.orderStatus==="PLACED"?"CONFIRMED":item.orderStatus==="CONFIRMED"?"SHIPPED":"DELEVERED"}</Button> */}
//                     <div>
//                       <Button
//                         id={`basic-button-${item?._id}`}
//                         aria-controls={`basic-menu-${item._id}`}
//                         aria-haspopup="true"
//                         aria-expanded={Boolean(anchorElArray[index])}
//                         onClick={(event) =>
//                           handleUpdateStatusMenuClick(event, index)
//                         }
//                       >
//                         Status
//                       </Button>
//                       <Menu
//                         id={`basic-menu-${item?._id}`}
//                         anchorEl={anchorElArray[index]}
//                         open={Boolean(anchorElArray[index])}
//                         onClose={() => handleUpdateStatusMenuClose(index)}
//                         MenuListProps={{
//                           "aria-labelledby": `basic-button-${item._id}`,
//                         }}
//                       >
//                         <MenuItem
//                           onClick={() => handleConfirmedOrder(item?._id, index)}
//                           disabled={
//                             item.orderStatus === "DELEVERED" ||
//                             item.orderStatus === "SHIPPED" ||
//                             item.orderStatus === "CONFIRMED"
//                           }
//                         >
//                           CONFIRMED ORDER
//                         </MenuItem>
//                         <MenuItem
//                           disabled={
//                             item.orderStatus === "DELIVERED" ||
//                             item.orderStatus === "SHIPPED"
//                           }
//                           onClick={() => handleShippedOrder(item._id, index)}
//                         >
//                           SHIPPED ORDER
//                         </MenuItem>
//                         <MenuItem
//                           onClick={() => handleDeliveredOrder(item._id)}
//                         >
//                           DELIVERED ORDER
//                         </MenuItem>
//                       </Menu>
//                     </div>
//                   </TableCell>
//                   <TableCell
//                     sx={{ textAlign: "center" }}
//                     className="text-white"
//                   >
//                     <Button
//                       onClick={() => handleDeleteOrder(item._id)}
//                       variant="text"
//                     >
//                       delete
//                     </Button>


//                   </TableCell>
                
                    
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Card>
      
//     </Box>
//   );
// };

// export default OrdersTable;
