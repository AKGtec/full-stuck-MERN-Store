import { createContext, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency =  "£";
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
    let cardData = structuredClone(CardItems);

    if (cardData[itemId]) {
      cardData[itemId] += 1;
    } else {
      cardData[itemId] = 1;
    }
    setCardItems(cardData);
    toast.success("Added to cart");
  };

  const updateCardItem = (itemId, quantity) => {
    let cardData = structuredClone(CardItems);
    cardData[itemId] = quantity; // Directly set the quantity
    setCardItems(cardData);
    toast.success("Cart updated");
  };

  const removeCardItem = (itemId) => {
    let cardData = structuredClone(CardItems);
    if (cardData[itemId]) {
      cardData[itemId] -= 1;
      if (cardData[itemId] <= 0) {
        delete cardData[itemId];
      }
    }
    setCardItems(cardData);
    toast.success("Item removed from cart");
  };

  const getCardCount = () => {
    let Totalcount = 0;
    for (const item in CardItems) {
      Totalcount += CardItems[item];
    }
    return Totalcount;
  };

  const getCardAmount = () => {
    let totalAmount = 0;
    for (const item in CardItems) {
      const itemInfo = Products.find((product) => product._id === item);
      if (CardItems[item] > 0) {
        totalAmount += itemInfo.offerPrice * CardItems[item];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    setShowUserLogin,
    showUserLogin,
    Products,
    currency,
    addToCard,
    updateCardItem,
    removeCardItem,
    CardItems,
    searchQuery,
    setsearchQuery,
    getCardCount,
    getCardAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const UseAppContext = () => {
  return useContext(AppContext);
};