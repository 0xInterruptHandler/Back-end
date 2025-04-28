const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./features/auth/auth.routes');
const cartRoutes = require('./features/cart/cart.routes');  
const productRoutes = require('./features/products/product.routes');  
const orderRoutes = require('./features/orders/order.routes');  

const app = express();

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes); // 
app.use('/api/products', productRoutes); 
app.use('/api/orders', orderRoutes);

sequelize.sync() //({ force: true })  // ⚠️ Esto borra todas las tablas cada vez que levantas el servidor
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database: ', error);
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
