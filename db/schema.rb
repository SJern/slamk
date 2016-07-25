# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160720161807) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "favorites", force: :cascade do |t|
    t.integer  "user_id",        null: false
    t.integer  "fav_message_id", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "favorites", ["fav_message_id"], name: "index_favorites_on_fav_message_id", using: :btree
  add_index "favorites", ["user_id"], name: "index_favorites_on_user_id", using: :btree

  create_table "messages", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.text     "body",       null: false
    t.integer  "room_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "messages", ["room_id"], name: "index_messages_on_room_id", using: :btree

  create_table "room_users", force: :cascade do |t|
    t.integer  "room_id",    null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "room_users", ["room_id", "user_id"], name: "index_room_users_on_room_id_and_user_id", unique: true, using: :btree

  create_table "rooms", force: :cascade do |t|
    t.string   "title",      null: false
    t.boolean  "channel",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "rooms", ["channel"], name: "index_rooms_on_channel", using: :btree
  add_index "rooms", ["title"], name: "index_rooms_on_title", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "fname",           null: false
    t.string   "lname",           null: false
    t.string   "email",           null: false
    t.boolean  "guest",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["fname"], name: "index_users_on_fname", using: :btree
  add_index "users", ["lname"], name: "index_users_on_lname", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
