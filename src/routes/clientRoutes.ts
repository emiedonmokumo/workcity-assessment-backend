import express from 'express';
import auth from '../middleware/auth';
import roleCheck from '../middleware/roleCheck';
import {
    createClient,
    getClients,
    updateClient,
    deleteClient,
} from '../controllers/clientController';

const router = express.Router();

router.use(auth);
router.get('/', getClients);
router.post('/', roleCheck(['admin']), createClient);
router.put('/:id', roleCheck(['admin']), updateClient);
router.delete('/:id', roleCheck(['admin']), deleteClient);

export default router;


/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management
 */

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   address:
 *                     type: string
 */

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Example Corp
 *               email:
 *                 type: string
 *                 example: client@example.com
 *               phone:
 *                 type: string
 *                 example: +2348012345678
 *               address:
 *                 type: string
 *                 example: 123 Main St, Lagos
 *     responses:
 *       201:
 *         description: Client created
 *       400:
 *         description: Missing required fields
 *       403:
 *         description: Forbidden (not admin)
 */

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Update an existing client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client updated
 *       400:
 *         description: Invalid ID or payload
 *       404:
 *         description: Client not found
 *       403:
 *         description: Forbidden (not admin)
 */

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Delete a client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     responses:
 *       204:
 *         description: Client deleted
 *       404:
 *         description: Client not found
 *       403:
 *         description: Forbidden (not admin)
 */
