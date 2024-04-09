-- Active: 1712231240978@@127.0.0.1@5432@postgres
DROP TABLE IF EXISTS services,commentaire_prestataire,presta,reserve, affectationVol, affectationMontgolfiere, vend, affectationStand, est, produit, stand, categorie_stand,vol, utilisateur, dater, emplacement, categorie, couleur, planning, parcours, montgolfiere, role CASCADE;

CREATE TABLE role (
   id_role SERIAL PRIMARY KEY,
   libelle_role VARCHAR(50) NOT NULL
);

CREATE TABLE montgolfiere (
   id_montgolfiere SERIAL PRIMARY KEY,
   nombre_place INT,
   libelle_montgolfiere VARCHAR(50),
   photo_montgolfiere VARCHAR(255),
   montgolfiere_est_active BOOLEAN
);

CREATE TABLE parcours (
   id_parcours SERIAL PRIMARY KEY,
   libelle_parcours VARCHAR(50),
   distance_parcours INT,
   duree_parcours VARCHAR(50)
);

CREATE TABLE planning (
   id_planning SERIAL PRIMARY KEY,
   date_debut TIMESTAMP,
   date_fin TIMESTAMP
);

CREATE TABLE couleur (
   id_couleur SERIAL PRIMARY KEY,
   libelle_couleur VARCHAR(50)
);

CREATE TABLE categorie (
   id_categorie SERIAL PRIMARY KEY,
   libelle_categorie VARCHAR(50),
   description_categorie VARCHAR(500)
);

CREATE TABLE emplacement (
   id_emplacement SERIAL PRIMARY KEY,
   libelle_emplacement VARCHAR(50),
   capacite_emplacement INT,
   caracteristique_emplacement VARCHAR(500),
   point_eau_nombre INT,
   prise_nombre INT,
   coordonnee_x DOUBLE PRECISION,
   coordonnee_y DOUBLE PRECISION
);

CREATE TABLE dater (
   id_date_reservation SERIAL PRIMARY KEY,
   date_reservation DATE
);

CREATE TABLE utilisateur (
   id_utilisateur SERIAL PRIMARY KEY,
   login_utilisateur VARCHAR(50),
   mot_de_passe_utilisateur VARCHAR(50),
   nom_utilisateur VARCHAR(50),
   prenom_utilisateur VARCHAR(50),
   mail_utilisateur VARCHAR(50),
   telephone_utilisateur VARCHAR(50),
   siret_utilisateur VARCHAR(50),
   id_role INT NOT NULL,
   FOREIGN KEY(id_role) REFERENCES role(id_role)
);

CREATE TABLE presta (
   id_presta SERIAL PRIMARY KEY,
   id_utilisateur INT NOT NULL UNIQUE,
   photo_profil VARCHAR(255),
   editeur_wysiwyg TEXT,
   nombre_visiteurs INT DEFAULT 0,
   services_activables JSONB,
   entete_livre_or VARCHAR(255) ,
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur)
);


CREATE TABLE services (
  id_service SERIAL PRIMARY KEY,
  id_presta INT REFERENCES presta(id_presta),
  service_key VARCHAR(255),
  activated BOOLEAN
);

CREATE TABLE commentaire_prestataire (
   id_commentaire SERIAL PRIMARY KEY,
   id_presta INT,
   pseudo VARCHAR(20),
   contenu_commentaire TEXT,
   date_commentaire TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY(id_presta) REFERENCES presta(id_presta)
);

CREATE TABLE vol (
   id_vol SERIAL PRIMARY KEY,
   prix_vol DECIMAL(15,2),
   libelle_vol VARCHAR(50),
   avis_vol TEXT,
   id_montgolfiere INT,
   id_parcours INT,
   id_planning INT,
   FOREIGN KEY(id_montgolfiere) REFERENCES montgolfiere(id_montgolfiere),
   FOREIGN KEY(id_parcours) REFERENCES parcours(id_parcours),
   FOREIGN KEY(id_planning) REFERENCES planning(id_planning)
);

CREATE TABLE categorie_stand (
   id_categorie_stand SERIAL PRIMARY KEY,
   libelle_categorie_stand VARCHAR(50)
);

CREATE TABLE stand (
   id_stand SERIAL PRIMARY KEY,
   libelle_stand VARCHAR(50),
   description_stand VARCHAR(500),
   image_stand TEXT,
   id_emplacement INT,
   id_categorie_stand INT,
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement),
   FOREIGN KEY(id_categorie_stand) REFERENCES categorie_stand(id_categorie_stand)
);


CREATE TABLE produit (
   id_produit SERIAL PRIMARY KEY,
   libelle_produit VARCHAR(50),
   stock_produit INT,
   prix_produit DECIMAL(15,2),
   description_produit VARCHAR(500),
   quantite_produit INT,
   image_produit VARCHAR(250),
   id_categorie INT,
   FOREIGN KEY(id_categorie) REFERENCES categorie(id_categorie)
);

CREATE TABLE est (
   id_montgolfiere INT,
   id_couleur INT,
   PRIMARY KEY(id_montgolfiere, id_couleur),
   FOREIGN KEY(id_montgolfiere) REFERENCES montgolfiere(id_montgolfiere),
   FOREIGN KEY(id_couleur) REFERENCES couleur(id_couleur)
);

CREATE TABLE affectationStand (
   id_utilisateur INT,
   id_stand INT,
   PRIMARY KEY(id_utilisateur, id_stand),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE ,
   FOREIGN KEY(id_stand) REFERENCES stand(id_stand) ON DELETE CASCADE
);

CREATE TABLE vend (
   id_stand INT,
   id_produit INT,
   PRIMARY KEY(id_stand, id_produit),
   FOREIGN KEY(id_stand) REFERENCES stand(id_stand),
   FOREIGN KEY(id_produit) REFERENCES produit(id_produit)
);

CREATE TABLE affectationMontgolfiere (
   id_utilisateur INT,
   id_montgolfiere INT,
   PRIMARY KEY(id_utilisateur, id_montgolfiere),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur),
   FOREIGN KEY(id_montgolfiere) REFERENCES montgolfiere(id_montgolfiere)
);

CREATE TABLE affectationVol (
   id_utilisateur INT,
   id_vol INT,
   PRIMARY KEY(id_utilisateur, id_vol),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur),
   FOREIGN KEY(id_vol) REFERENCES vol(id_vol)
);

CREATE TABLE reserve (
   id_utilisateur INT,
   id_stand INT,
   id_emplacement INT,
   id_date_reservation INT,
   PRIMARY KEY(id_utilisateur, id_stand, id_emplacement, id_date_reservation),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur),
   FOREIGN KEY(id_stand) REFERENCES stand(id_stand),
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement),
   FOREIGN KEY(id_date_reservation) REFERENCES dater(id_date_reservation)
);

ALTER TABLE montgolfiere ADD COLUMN id_vol INT;
ALTER TABLE montgolfiere ADD FOREIGN KEY (id_vol) REFERENCES vol(id_vol);


INSERT INTO role (libelle_role) VALUES
('Prestataire'),
('Montgolfier'),
('Admin');

INSERT INTO montgolfiere (nombre_place, libelle_montgolfiere, photo_montgolfiere, montgolfiere_est_active) VALUES
(4, 'Aurore', 'https://www.novo-monde.com/app/uploads/2019/06/montgolfiere-cappadoce.jpg', TRUE),
(6, 'Céleste', 'https://alpinemag.fr/wp-content/uploads/2022/11/valentin_delluc-scaled.jpg', TRUE),
(6, 'SKY', 'https://www.voyageavecnous.fr/wp-content/uploads/2023/01/vol-montgolfiere-cappadoce.jpg', TRUE),
(8, 'CLOUD', 'https://cdn.getyourguide.com/img/tour/5c5c257ee51ce.jpeg/146.jpg', FALSE),
(11, 'SPACE', 'https://cdn.getyourguide.com/img/tour/06edee758a7efc94dc8a02a86be68337073f347264aa163e863c5745b6f1099b.jpg/145.jpg', TRUE);
INSERT INTO parcours (libelle_parcours, distance_parcours, duree_parcours) VALUES
('Parcours du lever de soleil', 15, '3 heures'),
('Voyage au crépuscule', 20, '4 heures'),
('Vol sans tabout', 300, '24 heures');


INSERT INTO planning (date_debut, date_fin) VALUES
('2024-06-05', '2024-06-07'),
('2024-04-12', '2024-04-15'),
('2024-12-28', '2024-12-31');


INSERT INTO couleur (libelle_couleur) VALUES
('Bleu ciel'),
('Vert prairie');

INSERT INTO categorie (id_categorie,libelle_categorie, description_categorie) VALUES
(1,'Vêtement', 'Vêtements thématiques et souvenirs'),
(2,'Accessoire', 'Accessoires de voyage et gadgets'),
(3,'Burger', 'Tout type de burger'),
(4,'Boisson', 'Boisson rafraichissante');

INSERT INTO emplacement (libelle_emplacement, capacite_emplacement, caracteristique_emplacement, point_eau_nombre, prise_nombre, coordonnee_x, coordonnee_y) VALUES
('Point de vue nord', 100, 'Vue panoramique sur la vallée', 2, 1, 38.657497324, 34.836729986),
('Aire de repos sud', 30, 'Zone de détente et de pique-nique', 3, 4, 38.658697324, 34.835629986),
('Nouvel emplacement 1', 50, 'Description de nouvel emplacement 1', 1, 2, 38.66353089438699, 34.75217692706358),
('Nouvel emplacement 2', 40, 'Description de nouvel emplacement 2', 2, 3, 38.65991177565927, 34.77690383353858),
('Nouvel emplacement 3', 60, 'Description de nouvel emplacement 3', 1, 1, 38.621967045798414, 34.74101547622416),
('Espace détente', 25, 'Zone de relaxation avec hamacs', 0, 2, 38.594602202101825, 34.73861147142797),
('Point d observation', 80, 'Observation de la faune sauvage', 1, 4, 38.61928467943287, 34.73054088389794),
('Coin tranquille', 20, 'Endroit isolé pour la méditation', 0, 0, 38.59728549133628, 34.8967032222942),
('Zone de jeux', 50, 'Aire de jeux pour enfants', 0, 5, 38.59067771098481, 34.879274187521894),
('Aire de pique-nique centrale', 40, 'Espace central pour les repas', 2, 3, 38.589772028722855, 34.89253914255797);


INSERT INTO dater (date_reservation) VALUES
('2023-12-10'),
('2023-12-24');

INSERT INTO utilisateur (login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, telephone_utilisateur, siret_utilisateur, id_role)
VALUES
('administrateur', 'administrateur', 'admin', 'admin', 'admin@balonu.com', '0000000000', '00000000000000', 3),
('presta', 'presta', 'presta1', 'presta1', 'presta1@example.com','0436985521', '1234567841234', 1),
('login1', 'password1', 'Nom1', 'Prenom1', 'email1@example.com', '0143456789', '12345678971234', 1),
('login2', 'password2', 'Nom2', 'Prenom2', 'email2@example.com', '9874543210', '23456789062345', 2),
('alice123', 'alice123', 'Alicia', 'Alice', 'alice@example.com','05166464145', '1234567895234', 2),
('presta1', 'presta1', 'Bob', 'presta1', 'bob@example.com','0356985521', '1234567891264', 1),
('presta2', 'presta2', 'presta2', 'presta2', 'email1@example.com', '0143456789', '12345678901734', 1);
INSERT INTO presta (id_utilisateur, photo_profil, editeur_wysiwyg, services_activables, entete_livre_or)
VALUES
(2, 'https://img.freepik.com/vecteurs-premium/vue-laterale-tete-garcon-noir-portrait-profil-isole-fond-blanc_176411-8305.jpg', '<p>Description pour le prestataire 1</p>', '{"Livre d''or": true, "Comptage de visiteurs": true, "Les Stands": true}', 'Bienvenue sur mon Livre d''Or'),
(3, 'https://img.freepik.com/vecteurs-premium/avatar-illustration-vectorielle-jeune-homme-souriant_92795-2729.jpg', '<p>Description pour le prestataire 2</p>', '{"Livre d''or": true, "Comptage de visiteurs": true, "Les Stands": true}', 'Votre avis compte !'),
(4, 'https://ollow.fr/cdn/shop/products/PORTRAITOLLOWORANGE2_300x.png?v=1597638270', '<p>Description pour le prestataire 3</p>', '{"Livre d''or": true, "Comptage de visiteurs": true, "Les Montgolfières": true}', 'Laissez un commentaire'),
(5, 'https://www.shutterstock.com/image-photo/calm-serious-beautiful-millennial-african-600nw-2161635009.jpg', '<p>Description pour le prestataire 4</p>', '{"Livre d''or": true, "Comptage de visiteurs": true, "Les Montgolfières": true}', 'Bienvenue sur mon Livre d''Or'),
(6, 'https://media.istockphoto.com/id/1366180804/fr/photo/profil-du-m%C3%A2le-avec-coiffure-et-barbe-rouge-regarde-de-c%C3%B4t%C3%A9-avec-une-expression-s%C3%A9rieuse.jpg?s=612x612&w=0&k=20&c=gB0Ix3F65tj8yBZPmiav9wtFkyaGTBBp9NWgLQteB6c=', '<p>Description pour le prestataire 5</p>', '{"Livre d''or": true, "Comptage de visiteurs": true, "Les Stands": true}', 'Bienvenue sur mon Livre d''Or'),
(7, 'https://static.vecteezy.com/ti/vecteur-libre/p3/26434417-defaut-avatar-profil-icone-vecteur-de-social-medias-utilisateur-photo-vectoriel.jpg', '<p>Description pour le prestataire 6</p>', '{"Livre d''or": true, "Comptage de visiteurs": true, "Les Stands": true}', 'Bienvenue sur mon Livre d''Or');

INSERT INTO commentaire_prestataire (id_presta, pseudo, contenu_commentaire)
VALUES (1, 'Utilisateur1', 'Ceci est un commentaire sur le prestataire 1.'),
       (2, 'Utilisateur2', 'Un autre commentaire sur le prestataire 2.'),
       (1, 'Utilisateur3', 'Un autre commentaire pour le prestataire 1.'),
       (3, 'Utilisateur4', 'Un autre commentaire sur le prestataire 3.');

INSERT INTO vol (prix_vol, libelle_vol, avis_vol, id_montgolfiere, id_parcours, id_planning) VALUES
(250.00, 'Vol panoramique', 'Vue imprenable', 1, 1, 2),
(300.00, 'Expédition aérienne', 'Aventure inoubliable', 2, 2, 3),
(600.00, 'Voyage dans l espace', 'Magnifique', 4, 3, 1),
(124.50, 'Vol dans les nuages', 'Vole beau ', 5, 1, 3),
(5000.00, 'Voyage dans le ciel', 'Voyage en haut', 3, 3, 2);


INSERT INTO categorie_stand (libelle_categorie_stand) VALUES
('Restauration'),
('Boutique');

INSERT INTO stand (libelle_stand, description_stand, image_stand,id_emplacement,id_categorie_stand) VALUES
('Balonu Store', 'Souvenirs et cadeaux uniques','https://www.novo-monde.com/app/uploads/2019/06/montgolfiere-cappadoce.jpg' ,1,2),
('Burgouz', 'De la bonne bouffe','https://www.novo-monde.com/app/uploads/2019/06/montgolfiere-cappadoce.jpg' ,2,1),
('LesBugger', 'Les deux frere burger bug','https://www.les-suites-du-nevada.com/wp-content/uploads/2021/09/restaurant-panoramic-tignes-1.jpg' ,3,1),
('Drinku', 'Pour bien se rafraichir apres un vol','https://www.batiactu.com/images/auto/620-465-c/20101018_152201_mumbaiiiiii.jpg' ,4,1),
('Zarara', 'Des vetements pour tout les gouts et de qualité supperieur', 'https://media.admagazine.fr/photos/63207bb614420dbf05ebc6b1/16:9/w_2560%2Cc_limit/La%2520salle%2520Ovale%2520re%25CC%2581nove%25CC%2581e%2520%25C2%25A9%2520Jean-Christophe%2520Ballot%2520-%2520BnF%2520-%2520Oppic.jpg', 5, 2),
('Graille tout', 'Tu manges tu payes pas', 'https://www.lejardindemademoiselle-salondethe.com/wp-content/uploads/2022/07/salon-de-the-cadre.jpg', 6, 1);


INSERT INTO produit (libelle_produit, stock_produit, prix_produit, description_produit, quantite_produit, image_produit,id_categorie) VALUES
('Le cot cot', 21, 15.00, '', 1, 'https://www.poulet.ca/wp-content/uploads/2017/09/Jalapeno-Popper-Chicken-Burgers-1-1180x580.jpg',3),
('Coca', 30, 1.50, '', 1, 'https://static-resto.bewaps.com/data/61/produits/17180-18-large.jpg',4),
('Coca', 26, 1.00, '', 1, 'https://static-resto.bewaps.com/data/61/produits/17180-18-large.jpg',4),
('Orangina', 20, 1.00, '', 1, 'https://www.maitre-georges.com/6625-large_default/orangina-25-cl-boissons-gazeuse.jpg',4),
('Fish burger', 14, 12.99, '', 1, 'https://www.quemangercesoir.com/wp-content/uploads/2023/11/Recette-du-fish-burger.webp',3),
('Triple viandard', 23, 28.90, '', 1, 'https://www.sospizza-mamirolle.fr/wp-content/uploads/2021/04/triplecheeseburger.png',3),
('T-shirt Blue Lock', 3, 120.07, '', 1, 'https://www.bluelock-shop.com/cdn/shop/products/S60d272ed34c8495db9445707b0715747C_1200x1200.jpg?v=1669819567',1),
('Casquette Türkiye', 8, 57.99, '', 1, 'https://m.media-amazon.com/images/I/61eNm9YHcpL._AC_UY1000_.jpg',1),
('porte-clé montgol', 26, 3.40, '', 1, 'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/8e2b5537ae403a546d10e0da832c09bc.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp',2),
('Jouet montgolfiere', 6, 55.00, '', 1, 'https://ae01.alicdn.com/kf/S250654063c7349ce99a19752e2707af0p.jpg_640x640Q90.jpg_.webp',2),
('Burger Montgolfière Délice', 20, 14.99, 'Délicieux burger avec une touche spéciale de montgolfière', 1, 'https://miro.medium.com/v2/resize:fit:1400/1*LSYjzIJRyiRVI-7z68fr4Q.jpeg', 3),
('Burger Aventure dans les Nuages', 18, 12.50, 'Burger aventureux avec des saveurs uniques', 1, 'https://static.vecteezy.com/ti/photos-gratuite/p1/24228760-hamburger-avec-des-nuages-dans-le-ciel-generatif-ai-photo.jpg', 3),
('Burger Spicy', 22, 16.50, 'Burger qui vous fera monter en flèche de plaisir', 1, 'https://img.freepik.com/photos-premium/burger-epice_777078-577.jpg', 3),
('Montgolfière Fashion T-shirt', 10, 25.99, 'T-shirt avec un design unique de montgolfière pour les passionnés', 1, 'https://m.media-amazon.com/images/I/A13usaonutL._AC_CLa%7C2140%2C2000%7C91WViIHiWmL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UY780_.png', 1),
('Sac Aventure Montgolfière', 20, 34.99, 'Sac à dos avec un motif de montgolfière pour les explorateurs', 1, 'https://m.media-amazon.com/images/I/61i5zP67OfL._AC_UY780_.jpg', 2),
('Collier Montgolfière Chic', 10, 45.00, 'Collier élégant en forme de montgolfière', 1, 'https://www.latelierdescreateurs.com/adc_images/produits/aqaqz_prd.png', 2),
('Ciel Étoilé Boisson Gazeuse', 30, 1.50, 'Boisson gazeuse rafraîchissante inspirée du ciel étoilé', 1, 'https://img.freepik.com/photos-premium/bouteille-ciel-etoile-bouteille-ciel-etoile-arriere-plan_849715-1389.jpg', 4),
('Nuages Limonade', 26, 1.00, 'Limonade légère et pétillante comme les nuages', 1, 'https://www.taklope.com/27375-large_default/la-petite-limo-10ml.jpg', 4),
('Vent Frais Thé Glacé', 20, 1.00, 'Thé glacé rafraîchissant comme une brise légère', 1, 'https://www.thesdelapagode.com/guide-du-the/wp-content/uploads/2019/07/thes-et-infusions-glaces-1100px-745px.jpg', 4),
('Coca', 26, 1.00, '', 1, 'https://static-resto.bewaps.com/data/61/produits/17180-18-large.jpg',4),
('Orangina', 21, 1.20, '', 1, 'https://www.maitre-georges.com/6625-large_default/orangina-25-cl-boissons-gazeuse.jpg',4),
('Orangina', 23, 1.50, '', 1, 'https://www.maitre-georges.com/6625-large_default/orangina-25-cl-boissons-gazeuse.jpg',4),
('Coca', 28, 1.70, '', 1, 'https://static-resto.bewaps.com/data/61/produits/17180-18-large.jpg',4),
('Coca', 26, 1.10, '', 1, 'https://static-resto.bewaps.com/data/61/produits/17180-18-large.jpg',4);

INSERT INTO est (id_montgolfiere, id_couleur) VALUES
(1, 1),
(2, 2),
(3, 2),
(4, 2),
(5, 2);


INSERT INTO affectationStand (id_utilisateur, id_stand) VALUES
(3, 1),
(3, 3),
(2, 4),
(7, 2),
(7,5),
(6,6);

INSERT INTO vend (id_stand, id_produit) VALUES
-- Stand Balonu Store (Souvenirs et cadeaux)
(1, 9), -- Porte-clé montgol
(1, 10), -- Jouet montgolfiere
-- Stand Burgouz (De la bonne bouffe)
(2, 1),  -- Le cot cot
(2, 2),  -- Coca
(2, 4),  -- Orangina
-- Stand LesBugger (Les deux frères burger bug)
(3, 5),  -- Fish burger
(3, 6),  -- Triple viandard
(3, 11), -- Burger Montgolfière Délice
(3, 12), -- Burger Aventure dans les Nuages
(3, 13), -- Burger Spicy
(3, 20),  -- Coca
(3, 21),  -- Orangina
-- Stand Drinku (Pour bien se rafraîchir après un vol)
(4, 3),  -- Coca
(4, 17), -- Ciel Étoilé Boisson Gazeuse
(4, 18), -- Nuages Limonade
(4, 19), -- Vent Frais Thé Glacé

-- Stand Zarara (Des vêtements)
(5, 14), -- T-shirt Montgolfière
(5, 15), -- Sac Aventure Montgolfière
(5, 7),  -- T-shirt Blue Lock
(5, 8),  -- Casquette
(5, 16), -- Collier Montgolfière Chic

-- Stand Graille tout (Tu manges tu ne payes pas)
(6, 22),  -- Orangina
(6, 23),  -- Coca
(6, 1),  -- Le cot cot
(6, 6);  -- Triple viandard

INSERT INTO affectationMontgolfiere (id_utilisateur, id_montgolfiere) VALUES
(4, 1),
(4, 3),
(5, 2),
(5, 4),
(5, 5);

INSERT INTO affectationVol (id_utilisateur, id_vol) VALUES
(2, 1),
(3, 2);

INSERT INTO reserve (id_utilisateur, id_stand, id_emplacement, id_date_reservation) VALUES
(2, 1, 1, 1),
(3, 2, 2, 2);
INSERT INTO couleur (libelle_couleur) VALUES ('Rouge');
INSERT INTO couleur (libelle_couleur) VALUES ('Vert');
INSERT INTO couleur (libelle_couleur) VALUES ('Bleu');
INSERT INTO couleur (libelle_couleur) VALUES ('Jaune');
INSERT INTO couleur (libelle_couleur) VALUES ('Noir');

ALTER TABLE vend
   DROP CONSTRAINT vend_id_stand_fkey,
   ADD CONSTRAINT vend_id_stand_fkey
      FOREIGN KEY (id_stand)
         REFERENCES stand(id_stand)
         ON DELETE CASCADE;

ALTER TABLE reserve
   DROP CONSTRAINT reserve_id_stand_fkey,
   ADD CONSTRAINT reserve_id_stand_fkey
      FOREIGN KEY (id_stand)
         REFERENCES stand(id_stand)
         ON DELETE CASCADE;

