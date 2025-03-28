import Pro from "../Images/Pro.png"
import Pro1 from "../Images/Pro2.jpg"
import Pro2 from "../Images/Pro3.jpg"
import SI1 from "../Images/ProductDesc/PI1.png";
import SI2 from "../Images/ProductDesc/PI2.png";
import SI3 from "../Images/ProductDesc/PI3.png";
import SI4 from "../Images/ProductDesc/PI4.png";
import SI5 from "../Images/ProductDesc/PI5.png";
import SI6 from "../Images/ProductDesc/PI6.png";
const products = [
      {
        id: 1,
        image: Pro,
        name: "Elysian Elegance",
        discount: "-20% BLACK FRIDAY",
        price: "420 €",
        originalPrice: "590 €",
        colors: [
          { code: "#C0C0C0", image: Pro},
          { code: "#F1D700", image: Pro1 },
          { code: "#8B4513", image: Pro2 },
        ],
        stock:"100",
        desc:"Drape yourself in celestial beauty with this diamond-studded necklace.",
        gender:"Man",
        style:"DN3253-204",
        colorshown:'Dark Ash/Sail/Hyper Roya',
        deliverytime:"🚀 Estimated delivery: 3-5 business days.",
        deliverycharge:"✅ Free shipping & returns for all orders above $50.",
        review:"60",
        materialtype:["Gold","Silver","Platinium"],
        
        singleimage:[
         { img1:SI1,
          img2:SI2,
          img3:SI3,
          img4:SI4,
          img5:SI5,
          img6:SI6,
        }]
      },

      {
        id: 2,
        image: Pro,
        name: "Elysian Elegance",
        discount: "-20% BLACK FRIDAY",
        price: "472 €",
        originalPrice: "590 €",
        colors: [
          { code: "#C0C0C0", image: Pro},
          { code: "#F1D700", image: Pro1 },
          { code: "#8B4513", image: Pro2 },
        ],
        stock:"100",
        desc:"Drape yourself in celestial beauty with this diamond-studded necklace.",
        gender:"Man",
        colorshown:'Dark Ash/Sail/Hyper Roya',
        style:"DN3253-204",
        deliverytime:"🚀 Estimated delivery: 3-5 business days.",
        deliverycharge:"✅ Free shipping & returns for all orders above $50.",
        review:"60",
        materialtype:["Gold","Silver","Platinium"],
        
        singleimage:[
         { img1:SI1,
          img2:SI2,
          img3:SI3,
          img4:SI4,
          img5:SI5,
          img6:SI6,
        }]
      },

      {
        id: 3,
        image: Pro,
        name: "Elysian Elegance",
        discount: "-20% BLACK FRIDAY",
        price: "100 €",
        originalPrice: "590 €",
        colors: [
          { code: "#C0C0C0", image: Pro},
          { code: "#FFD700", image: Pro1 },
          { code: "#8B4513", image: Pro2 },
        ],
        stock:"100",
        desc:"Drape yourself in celestial beauty with this diamond-studded necklace.",
        gender:"Women.",
        colorshown:'Dark Ash/Sail/Hyper Roya',
        style:"DN3253-204",
        deliverytime:"🚀 Estimated delivery: 3-5 business days.",
        deliverycharge:"✅ Free shipping & returns for all orders above $50.",
        review:"60",
        materialtype:["Gold","Silver","Platinium"],
        
        singleimage:[
         { img1:SI1,
          img2:SI2,
          img3:SI3,
          img4:SI4,
          img5:SI5,
          img6:SI6,
        }]
      },
      {
        id: 4,
        image: Pro,
        name: "Elysian Elegance",
        discount: "-20% BLACK FRIDAY",
        price: "523 €",
        originalPrice: "590 €",
        colors: [
          { code: "#C0C0C0", image: Pro},
          { code: "#FFD700", image: Pro1 },
          { code: "#8B4513", image: Pro2 },
        ],
        stock:"100",
        desc:"Drape yourself in celestial beauty with this diamond-studded necklace.",
        gender:"Women.",
        colorshown:'Dark Ash/Sail/Hyper Roya',
        style:"DN3253-204",
        deliverytime:"🚀 Estimated delivery: 3-5 business days.",
        deliverycharge:"✅ Free shipping & returns for all orders above $50.",
        review:"600",
        materialtype:["Gold","Silver","Platinium","Wooden"],
        
        singleimage:[
         { img1:SI1,
          img2:SI2,
          img3:SI3,
          img4:SI4,
          img5:SI5,
          img6:SI6,
        }]
      },
      {
        id: 5,
        image: Pro,
        name: "Elysian Elegance",
        discount: "-20% BLACK FRIDAY",
        price: "523 €",
        originalPrice: "590 €",
        colors: [
          { code: "#C0C0C0", image: Pro},
          { code: "#FFD700", image: Pro1 },
          { code: "#8B4513", image: Pro2 },
        ],
        stock:"100",
        desc:"Drape yourself in celestial beauty with this diamond-studded necklace.",
        gender:"Women.",
        colorshown:'Dark Ash/Sail/Hyper Roya',
        style:"DN3253-204",
        deliverytime:"🚀 Estimated delivery: 3-5 business days.",
        deliverycharge:"✅ Free shipping & returns for all orders above $50.",
        review:"600",
        materialtype:["Gold","Silver","Platinium","Wooden"],
        
        singleimage:[
         { img1:SI1,
          img2:SI2,
          img3:SI3,
          img4:SI4,
          img5:SI5,
          img6:SI6,
        }]
      },
      {
        id: 6,
        image: Pro,
        name: "Elysian Elegance",
        discount: "-20% BLACK FRIDAY",
        price: "523 €",
        originalPrice: "590 €",
        colors: [
          { code: "#C0C0C0", image: Pro},
          { code: "#FFD700", image: Pro1 },
          { code: "#8B4513", image: Pro2 },
        ],
        stock:"100",
        desc:"Drape yourself in celestial beauty with this diamond-studded necklace.",
        gender:"Women.",
        colorshown:'Dark Ash/Sail/Hyper Roya',
        style:"DN3253-204",
        deliverytime:"🚀 Estimated delivery: 3-5 business days.",
        deliverycharge:"✅ Free shipping & returns for all orders above $50.",
        review:"600",
        materialtype:["Gold","Silver","Platinium","Wooden"],
        
        singleimage:[
         { img1:SI1,
          img2:SI2,
          img3:SI3,
          img4:SI4,
          img5:SI5,
          img6:SI6,
        }]
      },
      {
        id: 7,
        image: Pro,
        name: "Elysian Elegance",
        discount: "-20% BLACK FRIDAY",
        price: "523 €",
        originalPrice: "590 €",
        colors: [
          { code: "#C0C0C0", image: Pro},
          { code: "#FFD700", image: Pro1 },
          { code: "#8B4513", image: Pro2 },
        ],
        stock:"100",
        desc:"Drape yourself in celestial beauty with this diamond-studded necklace.",
        gender:"Women.",
        colorshown:'Dark Ash/Sail/Hyper Roya',
        style:"DN3253-204",
        deliverytime:"🚀 Estimated delivery: 3-5 business days.",
        deliverycharge:"✅ Free shipping & returns for all orders above $50.",
        review:"600",
        materialtype:["Gold","Silver","Platinium","Wooden"],
        
        singleimage:[
         { img1:SI1,
          img2:SI2,
          img3:SI3,
          img4:SI4,
          img5:SI5,
          img6:SI6,
        }]
      },
      {
        id: 8,
        image: Pro,
        name: "Elysian Elegance",
        discount: "-20% BLACK FRIDAY",
        price: "523 €",
        originalPrice: "590 €",
        colors: [
          { code: "#C0C0C0", image: Pro},
          { code: "#FFD700", image: Pro1 },
          { code: "#8B4513", image: Pro2 },
        ],
        stock:"100",
        desc:"Drape yourself in celestial beauty with this diamond-studded necklace.",
        gender:"Women.",
        colorshown:'Dark Ash/Sail/Hyper Roya',
        style:"DN3253-204",
        deliverytime:"🚀 Estimated delivery: 3-5 business days.",
        deliverycharge:"✅ Free shipping & returns for all orders above $50.",
        review:"600",
        materialtype:["Gold","Silver","Platinium","Wooden"],
        
        singleimage:[
         { img1:SI1,
          img2:SI2,
          img3:SI3,
          img4:SI4,
          img5:SI5,
          img6:SI6,
        }]
      },
      {
        id: 9,
        image: Pro,
        name: "Elysian Elegance",
        discount: "-20% BLACK FRIDAY",
        price: "523 €",
        originalPrice: "590 €",
        colors: [
          { code: "#C0C0C0", image: Pro},
          { code: "#FFD700", image: Pro1 },
          { code: "#8B4513", image: Pro2 },
        ],
        stock:"100",
        desc:"Drape yourself in celestial beauty with this diamond-studded necklace.",
        gender:"Women.",
        colorshown:'Dark Ash/Sail/Hyper Roya',
        style:"DN3253-204",
        deliverytime:"🚀 Estimated delivery: 3-5 business days.",
        deliverycharge:"✅ Free shipping & returns for all orders above $50.",
        review:"600",
        materialtype:["Gold","Silver","Platinium","Wooden"],
        
        singleimage:[
         { img1:SI1,
          img2:SI2,
          img3:SI3,
          img4:SI4,
          img5:SI5,
          img6:SI6,
        }]
      },
      {
        id: 10,
        image: Pro,
        name: "Elysian Elegance",
        discount: "-20% BLACK FRIDAY",
        price: "523 €",
        originalPrice: "590 €",
        colors: [
          { code: "#C0C0C0", image: Pro},
          { code: "#FFD700", image: Pro1 },
          { code: "#8B4513", image: Pro2 },
        ],
        stock:"100",
        desc:"Drape yourself in celestial beauty with this diamond-studded necklace.",
        gender:"Women.",
        colorshown:'Dark Ash/Sail/Hyper Roya',
        style:"DN3253-204",
        deliverytime:"🚀 Estimated delivery: 3-5 business days.",
        deliverycharge:"✅ Free shipping & returns for all orders above $50.",
        review:"600",
        materialtype:["Gold","Silver","Platinium","Wooden"],
        
        singleimage:[
         { img1:SI1,
          img2:SI2,
          img3:SI3,
          img4:SI4,
          img5:SI5,
          img6:SI6,
        }]
      },
      {
        id: 11,
        image: Pro,
        name: "Elysian Elegance",
        discount: "-20% BLACK FRIDAY",
        price: "523 €",
        originalPrice: "590 €",
        colors: [
          { code: "#C0C0C0", image: Pro},
          { code: "#FFD700", image: Pro1 },
          { code: "#8B4513", image: Pro2 },
        ],
        stock:"100",
        desc:"Drape yourself in celestial beauty with this diamond-studded necklace.",
        gender:"Women.",
        colorshown:'Dark Ash/Sail/Hyper Roya',
        style:"DN3253-204",
        deliverytime:"🚀 Estimated delivery: 3-5 business days.",
        deliverycharge:"✅ Free shipping & returns for all orders above $50.",
        review:"600",
        materialtype:["Gold","Silver","Platinium","Wooden"],
        
        singleimage:[
         { img1:SI1,
          img2:SI2,
          img3:SI3,
          img4:SI4,
          img5:SI5,
          img6:SI6,
        }]
      },
      
      
      
  ];

  export default products;