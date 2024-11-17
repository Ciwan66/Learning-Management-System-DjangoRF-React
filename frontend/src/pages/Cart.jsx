import React, { useEffect, useState, useContext, useCallback } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import MyTextfield from "../components/mui/MyTextField";
import MyVerticalCard from "../components/mui/MyVerticalCard";
import { useForm } from "react-hook-form";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useCart } from "../context/CartContext";
function Cart() {
  const { handleSubmit, control } = useForm();
  const axiosInstance = useAxios()
  const { user } = useContext(AuthContext);
  const { removeCourseFromCart , addCourseToWishlist } = useCart();
  const [loading, setloading] = useState(true);
  const [cart, setCart] = useState([]);

  const submitForm = (cart) => {
    console.log(cart);
  };

  const getData = async () => {
    setloading(true);
    try {
      const response = await axiosInstance.get("/cart/test/");
      setCart(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };
  const handleRemoveCourseFromCart = async (item_id) => {
    await removeCourseFromCart(item_id);
    getData();
  };
  const handoleMoveToWishlist = async (course_id,item_id) => {
    await addCourseToWishlist(course_id)
    await handleRemoveCourseFromCart(item_id)
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                width: { xs: "90%", md: "71.5%" },
                mt: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  ml: { xs: "20px", md: "40px" },
                  mr: { xs: "20px", md: "58px" },
                  mt: 2,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "24px", md: "40px" },
                    lineHeight: 1,
                  }}
                >
                  Shopping Cart
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  ml: { xs: "20px", md: "40px" },
                  mr: { xs: "20px", md: "58px" },
                }}
              >
                {cart ? (
                  <>
                    <Box sx={{ width: { xs: "100%", md: "70.5%" } }}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          mt: 2,
                          lineHeight: 1,
                          mb: 1,
                          color: "#2d2f31",
                        }}
                      >
                        {cart.items.length} Courses in Cart
                      </Typography>
                      <List>
                        {cart.items.map((item, index) => {
                          return (
                            <Box key={index}>
                              <Divider sx={{ mb: 1 }} />

                              <ListItem sx={{ alignItems: "start", pr: 0 }}>
                                <MyVerticalCard
                                  item={item}
                                  removeCourse={handleRemoveCourseFromCart}
                                  moveCourseToWishlist={handoleMoveToWishlist}
                                />
                              </ListItem>
                            </Box>
                          );
                        })}
                      </List>
                    </Box>
                    <Box
                      sx={{
                        width: { xs: "100%", md: "24%" },
                        height: "400px",
                        mt: { xs: 3, md: 0 },
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "16px",
                          mt: 2,
                          lineHeight: 1,
                          color: "#2d2f31ad",
                        }}
                      >
                        Total:
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "32px",
                          mt: 2,
                          lineHeight: 1,
                        }}
                      >
                        ${"9999"}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                          mt: 2,
                          borderRadius: "0px",
                          height: "48px",
                          width: "100%",
                        }}
                      >
                        Checkout
                      </Button>
                      <Divider sx={{ mt: 2 }} />
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "16px",
                          mt: 2,
                          lineHeight: 1,
                        }}
                      >
                        Promotions
                      </Typography>
                      <form onSubmit={handleSubmit(submitForm)}>
                        <Box sx={{ display: "flex", height: "45px", mt: 2 }}>
                          <MyTextfield
                            name="coupon"
                            label="Enter Coupon"
                            control={control}
                            height={"100%"}
                          />
                          <Button
                            variant="contained"
                            type="submit"
                            color="secondary"
                            sx={{
                              borderRadius: "0px",
                              height: "100%",
                              width: "20%",
                            }}
                          >
                            Apply
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  </>
                ) : (
                  <>0 Courses in Cart</>
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default Cart;
