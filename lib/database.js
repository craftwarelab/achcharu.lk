import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy, limit } from "firebase/firestore";

// Add data to collection
export const addUser = async (userData) => {
  const docRef = await addDoc(collection(db, "users"), userData);
  return docRef.id;
};

// Get all users
export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addProduct = async (product) => {
  try {
    const docref = await addDoc(collection(db, "products"), product);
    return docref.id;
  } catch (error) {
    console.error("Error adding product: ", error);
    throw new Error("Failed to add product");
  }
};

export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw new Error("Failed to fetch products");
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    let product = null;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.slug === slug) {
        product = { id: doc.id, ...data };
      }
    });
    return product;
  } catch (error) {
    console.error("Error fetching product by slug: ", error);
    throw new Error("Failed to fetch product by slug");
  }
};

export const updateProduct = async (id, updatedData) => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updatedData);
    return true;
  } catch (error) {
    console.error("Error updating product: ", error);
    throw new Error("Failed to update product");
  }
};

export const deleteProduct = async (id) => {
  try {
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw new Error("Failed to delete product");
  }
};

// Recipes CRUD
export const addRecipe = async (recipe) => {
  try {
    const docref = await addDoc(collection(db, "recipes"), recipe);
    return docref.id;
  } catch (error) {
    console.error("Error adding recipe: ", error);
    throw new Error("Failed to add recipe");
  }
};

export const getAllRecipes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    const recipes = [];
    querySnapshot.forEach((doc) => {
      recipes.push({ id: doc.id, ...doc.data() });
    });
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes: ", error);
    throw new Error("Failed to fetch recipes");
  }
};

export const getRecipeBySlug = async (slug) => {
  try {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    let recipe = null;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.slug === slug) {
        recipe = { id: doc.id, ...data };
      }
    });
    return recipe;
  } catch (error) {
    console.error("Error fetching recipe by slug: ", error);
    throw new Error("Failed to fetch recipe by slug");
  }
};

export const updateRecipe = async (id, updatedData) => {
  try {
    const recipeRef = doc(db, "recipes", id);
    await updateDoc(recipeRef, updatedData);
    return true;
  } catch (error) {
    console.error("Error updating recipe: ", error);
    throw new Error("Failed to update recipe");
  }
};

export const deleteRecipe = async (id) => {
  try {
    const recipeRef = doc(db, "recipes", id);
    await deleteDoc(recipeRef);
    return true;
  } catch (error) {
    console.error("Error deleting recipe: ", error);
    throw new Error("Failed to delete recipe");
  }
};

export const addContactMessage = async (contactData) => {
  try {
    // Spam prevention: check if this email sent a message in the last 2 minutes
    if (contactData.email) {
      const contactsRef = collection(db, "contacts");
      const q = query(
        contactsRef,
        where("email", "==", contactData.email),
        orderBy("timestamp", "desc"),
        limit(1)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const lastMsg = snapshot.docs[0].data();
        const lastTime = lastMsg.timestamp instanceof Date
          ? lastMsg.timestamp.getTime()
          : lastMsg.timestamp?.toMillis?.() || 0;
        const now = Date.now();
        if (lastTime > now - 2 * 60 * 1000) {
          throw new Error("You are sending messages too quickly. Please wait a moment.");
        }
      }
    }
    const now = new Date();
    const formattedDate = now.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const docRef = await addDoc(collection(db, "contacts"), {
      ...contactData,
      timestamp: now,
      dateString: formattedDate,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding contact message: ", error);
    throw new Error(error.message || "Failed to send contact message");
  }
};

// Get all contacts
export const getAllContacts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "contacts"));
    const contacts = [];
    querySnapshot.forEach((doc) => {
      contacts.push({ id: doc.id, ...doc.data() });
    });
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts: ", error);
    throw new Error("Failed to fetch contacts");
  }
};

export const placeOrder = async (orderData) => {
  try {
    // Ensure price is a number and not undefined
    const safeOrderData = {
      ...orderData,
      price: typeof orderData.price === "number" ? orderData.price : 0,
    };
    const now = new Date();
    const formattedDate = now.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const docRef = await addDoc(collection(db, "orders"), {
      ...safeOrderData,
      timestamp: now,
      dateString: formattedDate,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error placing order: ", error);
    throw new Error("Failed to place order");
  }
};

export const getAllOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
  } catch (error) {
    console.error("Error fetching orders: ", error);
    throw new Error("Failed to fetch orders");
  }
};

// Category CRUD
export const addCategory = async (categoryData) => {
  try {
    // Add category with unique slug
    const docRef = await addDoc(collection(db, "categories"), {
      name: categoryData.name,
      image: categoryData.image || "",
      slug: categoryData.slug || "",
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding category: ", error);
    throw new Error(error.message || "Failed to add category");
  }
};

export const getAllCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const categories = [];
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    throw new Error("Failed to fetch categories");
  }
};

export const updateCategory = async (id, updatedData) => {
  try {
    const categoryRef = doc(db, "categories", id);
    await updateDoc(categoryRef, {
      name: updatedData.name,
      image: updatedData.image || "",
      slug: updatedData.slug || "",
    });
    return true;
  } catch (error) {
    console.error("Error updating category: ", error);
    throw new Error("Failed to update category");
  }
};

export const deleteCategory = async (id) => {
  try {
    const categoryRef = doc(db, "categories", id);
    await deleteDoc(categoryRef);
    return true;
  } catch (error) {
    console.error("Error deleting category: ", error);
    throw new Error("Failed to delete category");
  }
};

// Get products by categorySlug
export const getProductsByCategorySlug = async (categorySlug) => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.categorySlug === categorySlug) {
        products.push({ id: doc.id, ...data });
      }
    });
    return products;
  } catch (error) {
    console.error("Error fetching products by categorySlug: ", error);
    throw new Error("Failed to fetch products by categorySlug");
  }
};

export const getProductsByCategoryName = async (categoryName) => {
  try {
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    let categoryId = null;
    categoriesSnapshot.forEach((doc) => {
      if (doc.data().name === categoryName) {
        categoryId = doc.id;
      }
    });
    if (!categoryId) return [];
    const productsSnapshot = await getDocs(collection(db, "products"));
    const products = [];
    productsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.categoryId === categoryId) {
        products.push({ id: doc.id, ...data });
      }
    });
    return products;
  } catch (error) {
    console.error("Error fetching products by category name: ", error);
    throw new Error("Failed to fetch products by category name");
  }
};

