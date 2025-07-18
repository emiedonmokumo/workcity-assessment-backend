import express from 'express';
import auth from '../middleware/auth';
import roleCheck from '../middleware/roleCheck';
import {
  createProject,
  getProjects,
  getProjectsByClient,
  updateProject,
  deleteProject,
  getProject,
} from '../controllers/projectController';

const router = express.Router();

router.use(auth);
router.get('/', getProjects);
router.get('/:id', getProject);
router.get('/client/:clientId', getProjectsByClient);
router.post('/', roleCheck(['admin']), createProject);
router.put('/:id', roleCheck(['admin']), updateProject);
router.delete('/:id', roleCheck(['admin']), deleteProject);

export default router;



/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all projects
 */

/**
 * @swagger
 * /api/projects/client/{clientId}:
 *   get:
 *     summary: Get projects for a specific client
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the client
 *     responses:
 *       200:
 *         description: List of projects for the client
 */

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - client
 *             properties:
 *               title:
 *                 type: string
 *                 example: Project A
 *               description:
 *                 type: string
 *                 example: This is the first project.
 *               client:
 *                 type: string
 *                 example: 64bc123a73bcd089f3c2be59
 *               budget:
 *                 type: number
 *                 example: 50000
 *               status:
 *                 type: string
 *                 enum: [pending, ongoing, completed]
 *                 example: pending
 *     responses:
 *       201:
 *         description: Project created
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden (admin only)
 */

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Project Title
 *               description:
 *                 type: string
 *                 example: Updated description
 *               budget:
 *                 type: number
 *                 example: 100000
 *               status:
 *                 type: string
 *                 enum: [pending, ongoing, completed]
 *                 example: completed
 *     responses:
 *       200:
 *         description: Project updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Project not found
 */

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       204:
 *         description: Project deleted
 *       404:
 *         description: Project not found
 */
