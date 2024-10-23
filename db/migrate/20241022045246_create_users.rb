class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users, id: false do |t|
      t.string :uid, primary_key: true
      t.string :email, null: false

      t.timestamps
    end
  end
end
