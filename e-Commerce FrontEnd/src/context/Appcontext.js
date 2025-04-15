import { createContext, useEffect, useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";

export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {

    const currency = /*import.meta.env.VITE_CURRENCY || */"$";
 
    const navigate = useNavigate();
    const [user, setUser] = useState(true);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [Products, setProducts] = useState([]);
    const [CardItems, setCardItems] = useState({});
    const [searchQuery, setsearchQuery] = useState({});

    const fetchProducts = async () => {
        setProducts(dummyProducts);
    };

    const addToCard = (itemId) => {
      let cardData =structuredClone(CardItems);

      if (cardData[itemId]) {
        cardData[itemId] += 1;
      } else {
        cardData[itemId] = 1 ;
      }
      setCardItems(cardData);
      toast.success("Added to cart", )
    };
     
    const updateCardItem = (itemId, quantity) => {
      let cardData = structuredClone(CardItems);
      cardData[itemId].quantity = quantity;
      setCardItems(cardData);
      toast.success("Cart updated")
    };

    const removeCardItem = (itemId) => {
      let cardData = structuredClone(CardItems);
      if( cardData[itemId]) {
         cardData[itemId]-=1;
         if(cardData[itemId].quantity === 0) {
            delete cardData[itemId];
         }
      }
      setCardItems(cardData);
      toast.success("Item removed from cart")
    }


    useEffect(() => {
        fetchProducts();
    }, []);

    const value = {navigate, user, setUser, isSeller,
       setIsSeller,setShowUserLogin,showUserLogin,
       Products,currency,addToCard,updateCardItem,
       removeCardItem,CardItems,searchQuery,setsearchQuery};
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
export const UseAppContext = () => {
    return useContext(AppContext)
}