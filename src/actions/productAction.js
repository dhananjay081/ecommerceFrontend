import axios from "axios"

import{
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,

    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,

    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
   
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,  

    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,

    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,

    CATEGORY_PRODUCT_REQUEST,
    CATEGORY_PRODUCT_SUCCESS,
    CATEGORY_PRODUCT_FAIL,

    CATEGORYWISE_PRODUCT_SUCCESS,
    CATEGORYWISE_PRODUCT_FAIL,

    CLEAR_ERRORS
} from "../constants/productConstants";

export const getProduct = (keyword = "" , currentPage = 1 , price=[0 ,100000],category,ratings = 0)=> async (dispatch)=>{
    try {
        dispatch({type: ALL_PRODUCT_REQUEST });

        

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lt]=${price[1]}&ratings[gte]=${ratings[0]}&ratings[lte]=${ratings[1]}`;

        if (category) {
            link += `&category=${category}`;
        }

        console.log(link)

        const {data} = await axios.get(link);

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response?.data?.message || error.message || "Something went wrong", // Improved error handling
          });
    }
}

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
  
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const getCategoryProduct = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_PRODUCT_REQUEST });
        
       

        const { data } = await axios.get("/api/v1/get-categoryProduct");
    

        dispatch({
            type: CATEGORY_PRODUCT_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const getCategoryWiseProducts = (category) => async (dispatch) => {

  try {
    
  
    const response = await axios.post('/api/v1/category-product', { category });
    console.log(category)
    dispatch({
      type: CATEGORYWISE_PRODUCT_SUCCESS,
      payload: response.data.data, // Make sure data structure is correct
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: CATEGORYWISE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


//product details
export const getProductDetails = (id)=> async (dispatch)=>{
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST });

        const {data} = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response?.data?.message || error.message || "Something went wrong", // Improved error handling
          });
    }
}
// createProduct
export const createProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/api/v1/admin/product/new`,
        productData,
        config
      );
  
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };


export const  getAdminProducts = ()=> async (dispatch)=>{
    try {
        dispatch({type: ADMIN_PRODUCT_REQUEST });

        const {data} = await axios.get(`/api/v1/admin/products`);

        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response?.data?.message || error.message || "Something went wrong", 
          });
    }
}

// get reviews
export const newReview = (reviewData)=> async (dispatch)=>{
    try {
        dispatch({type: NEW_REVIEW_REQUEST });
        const config = {
            headers : {"Content-Type": "application/json"},
        }

        const {data} = await axios.put(`/api/v1/review`,reviewData, config);

        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response?.data?.message || error.message || "Something went wrong", // Improved error handling
          });
    }
}


// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};



// clearing Errors
export const clearErrors = ()=> async (dispatch)=>{
    dispatch({type: CLEAR_ERRORS})
}