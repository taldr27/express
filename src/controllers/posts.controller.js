import { ZodError } from "zod";
import { prisma } from "../config/prisma.js";
import { CreatePostSchema } from "../schemas/posts.schema.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        user: {
          select: {
            id: true,
            name: true,
            last_name: true,
            email: true,
          },
        },
      },
    });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ errors: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { body } = req;
    const validatedPost = CreatePostSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        id: validatedPost.user_id,
      },
    });

    if (!user) {
      return res.status(404).json({ errors: "User not found" });
    }

    const post = await prisma.post.create({
      data: validatedPost,
    });

    return res.status(201).json(post);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.issues });
    }
    return res.status(500).json({ errors: error.message });
  }
};

export const transactions = async (req, res) => {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.post.create({
        data: {
          title: "Transaction 1",
          content: "This is a transaction 1",
          user_id: 1,
        },
      });

      await tx.post.create({
        data: {
          title: "Transaction 2",
          content: "This is a transaction 2",
          user_id: 1,
        },
      });
    });

    return res.status(200).json({ message: "Transactions completed" });
  } catch (error) {
    return res.status(500).json({ errors: error.message });
  }
};

export const upsertPost = async (req, res) => {
  try {
    const { postId } = req.params;
    await prisma.post.upsert({
      where: {
        id: parseInt(postId),
      },
      create: {
        title: "Upsert Post",
        content: "This is an upsert post",
        user_id: 1,
      },
      update: {
        title: "Upsert Post Updated",
        content: "This is an upsert post updated",
      },
    });

    return res.status(200).json({ message: "Post upserted" });
  } catch (error) {
    return res.status(500).json({ errors: error.message });
  }
};
