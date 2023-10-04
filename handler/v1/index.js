import { pool } from "../../externals/postgres.js";
import { getPagination } from "../../helpers/index.js";

export const create = async (req, res, next) => {
  try {
    const { title, body } = req.body;

    const create = await pool.query(
      "INSERT INTO posts (title, body) values ($1, $2) RETURNING *;",
      [title, body]
    );

    res.status(201).json({
      status: true,
      message: `a new data was Created!`,
      data: create.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

export const shows = async (req, res, next) => {
  try {
    const { search } = req.query;
    const query = search
      ? `SELECT * FROM posts WHERE title like '%${search}%' OR body like '%${search}%';`
      : `SELECT * FROM posts;`;
    const index = await pool.query(query);
    res.status(200).json({
      status: true,
      message: "OK!",
      data: index.rows,
    });
  } catch (err) {
    next(err);
  }
};

export const showsPaginate = async (req, res, next) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const filter = req.query.filter ? req.query.filter : "ASC";

    const results = await pool.query(
      `SELECT * FROM posts ORDER BY id ${filter} LIMIT $1 OFFSET $2;`,
      [limit, (page - 1) * limit]
    );
    const counts = await pool.query("SELECT COUNT(*) FROM posts;");
    const pagination = getPagination(
      req,
      counts.rows[0].count,
      limit,
      page,
      filter
    );

    res.status(200).json({
      status: true,
      message: "Success!",
      data: {
        pagination,
        posts: results.rows,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const show = await pool.query("SELECT * FROM posts WHERE id = $1;", [id]);
    if (!show.rows[0]) {
      return res.status(404).json({
        status: false,
        message: "Not Found",
      });
    }
    res.status(200).json({
      status: true,
      message: "OK!",
      data: show.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const update = await pool.query(
      "UPDATE posts SET title = $1, body = $2 WHERE id = $3 RETURNING *;",
      [title, body, id]
    );

    if (!update.rows[0]) {
      return res.status(404).json({
        status: false,
        message: "Not Found",
      });
    }

    res.status(200).json({
      status: true,
      message: `Data with id ${id} was Updated!`,
      data: update.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletePost = await pool.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *;",
      [id]
    );

    if (!deletePost.rows[0]) {
      return res.status(404).json({
        status: false,
        message: "Not Found",
      });
    }

    res.status(200).json({
      status: true,
      message: `Data with id ${id} was Deleted!`,
      data: deletePost.rows[0],
    });
  } catch (error) {
    next(error);
  }
};
